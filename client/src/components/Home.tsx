import React from "react";
import { Puppy } from "../types";
import { Link } from "react-router-dom";

interface IHomeProps {
  puppies: Puppy[];
}

const Home = ({ puppies }: IHomeProps) => {
  return (
    <div>
      {puppies.map((p) => (
        <Link to={`/puppy/${p.id}`} key={p.id}>
          <div>
            <h4>{p.name}</h4>
            <p>{p.breed}</p>{" "}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
