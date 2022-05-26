import { Link, useParams } from 'react-router-dom';
import { Puppy } from '../../types';
import './PuppyDetails.css';

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
        <article className="puppy">
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          <figure className="card">
            <img
              className="card__image"
              src="/puppy-placeholder.jpg"
              alt="puppy"
            />
            <figcaption className="caption">
              <div className="details">
                <h3 className="details__name">{found.name}</h3>
                <p className="details__breed">{found.breed}</p>
                <p className="details__bdate">{found.birthDate}</p>
              </div>
            </figcaption>
            <div className="btns">
              <button
                className="card__btn"
                onClick={() => handleDelete(found.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
                Delete
              </button>
              <Link to={`/puppy/edit/${found.id}`}>
                <button className="card__btn">
                  <i className="fa-solid fa-pen-to-square" />
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
