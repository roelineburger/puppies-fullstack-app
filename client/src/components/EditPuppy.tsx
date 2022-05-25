import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Puppy } from "../types";

interface IEditPuppyProps {
  puppies: Puppy[];
  setPuppies: React.Dispatch<React.SetStateAction<Puppy[]>>;
}

const EditPuppy = ({ puppies, setPuppies }: IEditPuppyProps) => {
  const { id } = useParams();

  const foundPuppy = puppies.find((p) => p.id === Number(id));
  const initialState = {
    id: foundPuppy?.id,
    name: foundPuppy?.name,
    breed: foundPuppy?.breed,
    birthDate: foundPuppy?.birthDate,
  };
  const [message, setMessage] = useState("");
  const [editPuppy, setEditPuppy] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditPuppy((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const handleEditPuppy = async () => {
      const options = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editPuppy),
      };
      const res = await fetch(
        `http://localhost:3010/api/puppies/${id}`,
        options
      );

      if (res.ok) {
        setMessage("Puppy has been edited!");
        setTimeout(() => setMessage(""), 4000);
        setPuppies((prev) => {
          const filtered = prev.filter((p) => p.id !== Number(id));
          return [...filtered, editPuppy as Puppy];
        });
        setEditPuppy(initialState);
      } else {
        setMessage("Failed to edit puppy");
      }
    };
    handleEditPuppy();
  };
  return (
    <form onSubmit={handleSave}>
      {message && <h2>{message}</h2>}
      <header>Edit puppy</header>
      <input
        type="text"
        name="name"
        value={editPuppy.name}
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="breed"
        value={editPuppy.breed}
        required
        onChange={handleChange}
      />
      <input
        type="date"
        name="birthDate"
        value={editPuppy.birthDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditPuppy;
