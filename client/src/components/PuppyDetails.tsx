import React from "react";
import { Link, useParams } from "react-router-dom";
import { Puppy } from "../types";

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

  const found = puppies.find((p) => p.id === Number(id));
  return (
    <div>
      {found && (
        <section>
          {errorMessage && <h3>{errorMessage}</h3>}

          <h3> Name : {found.name}</h3>
          <h3>Breed : {found.breed}</h3>
          <h3>Birth Date: {found.birthDate}</h3>
          <button
            className="btn btn-primary"
            onClick={() => handleDelete(found.id)}
          >
            Delete
          </button>
          <Link to={`/puppy/edit/${found.id}`}>Edit</Link>
        </section>
      )}
    </div>
  );
};

export default PuppyDetails;
