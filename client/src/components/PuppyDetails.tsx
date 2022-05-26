import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Puppy } from '../types';

interface IPuppyDetails {
  puppies: Puppy[];
  deletePuppy: (id: number) => void;
  errorMessage: string;
}

const PuppyDetails = ({
  puppies,
  deletePuppy,
  errorMessage,
}: IPuppyDetails) => {
  const { id } = useParams();

  const handleDelete = (pid: number) => {
    deletePuppy(pid);
  };

  const found = puppies.find(p => p.id === Number(id));

  return (
    <>
      {found && (
        <article>
          {errorMessage && <h3>{errorMessage}</h3>}
          <figure className="card">
            <img
              className="card__image"
              src="/puppy-placeholder.jpg"
              alt="puppy placeholder"
            />
            <figcaption className="details">
              <p className="details__name">Name: {found.name}</p>
              <p className="details__breed">Breed: {found.breed}</p>
              <p className="details__bdate">Birth Date: {found.birthDate}</p>
            </figcaption>
            <div className="btns">
              <button
                className="card__btn"
                onClick={() => handleDelete(found.id)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
                Delete
              </button>
              <Link to={`/puppy/edit/${found.id}`}>
                <button className="card__btn">
                  <i className="fa-solid fa-trash-can"></i>
                  Edit
                </button>
              </Link>
            </div>
          </figure>
        </article>
      )}
    </>
  );
};

export default PuppyDetails;
