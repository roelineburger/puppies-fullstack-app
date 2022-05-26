import React, { useState } from "react";
import { Puppy } from "../types";
interface IAddPuppyProps {
  puppies: Puppy[];
}

const AddPuppy = ({ puppies }: IAddPuppyProps) => {
  const initialState = {
    id: 0,
    name: "",
    breed: "",
    birthDate: "",
  };
  const [message, setMessage] = useState("");
  const [newPuppy, setNewPuppy] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewPuppy({ ...newPuppy, id: Number(Date.now()), [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const addPuppy = async () => {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPuppy),
      };
      const res = await fetch("http://localhost:3010/api/puppies/", options);

      if (res.ok) {
        puppies.push(newPuppy);
        setMessage("New puppy has been added!");
        setTimeout(() => setMessage(""), 4000);
        setNewPuppy(initialState);
      } else {
        setMessage("Failed to add a puppy");
      }
    };
    addPuppy();
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <h2>{message}</h2>}
      <header>Add a new puppy</header>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newPuppy.name}
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="breed"
        placeholder="Breed"
        value={newPuppy.breed}
        required
        onChange={handleChange}
      />
      <input
        type="date"
        name="birthDate"
        value={newPuppy.birthDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddPuppy;
