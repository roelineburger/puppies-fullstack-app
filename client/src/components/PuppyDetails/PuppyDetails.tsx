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
              src="/public/puppy-placeholder.jpg"
              alt="puppy"
            />
            <figcaption className="card__caption">
              <h3>{found.name}</h3>
              <p>{found.breed}</p>
              <p>{found.birthDate}</p>
            </figcaption>
            <div className="btns">
              <button
                className="card__btn"
                onClick={() => handleDelete(found.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
                Delete
              </button>
              <button className="card__btn">
                <i className="fa-solid fa-pen-to-square" />
                <Link to={`/puppy/edit/${found.id}`}>Edit</Link>
              </button>
            </div>
          </figure>
        </article>
      )}
    </>
  );
};

export default PuppyDetails;
