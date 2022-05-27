import React, { useState } from 'react';
import { Puppy } from '../types';
import logo from '../good_doggy.svg';
import '../css/AddPuppy.css';
interface IAddPuppyProps {
  puppies: Puppy[];
  setPuppies: React.Dispatch<React.SetStateAction<Puppy[]>>;
}

const AddPuppy = ({ puppies, setPuppies }: IAddPuppyProps) => {
  const initialState = {
    id: 0,
    name: '',
    breed: '',
    birthDate: '',
  };
  const [message, setMessage] = useState('');
  const [newPuppy, setNewPuppy] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewPuppy({ ...newPuppy, id: Number(Date.now()), [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const addPuppy = async () => {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPuppy),
      };
      const res = await fetch('http://localhost:3010/api/puppies/', options);

      if (res.ok) {
        setPuppies(puppies.concat(newPuppy));
        setMessage('New puppy has been added!');
        setTimeout(() => setMessage(''), 4000);
        setNewPuppy(initialState);
      } else {
        setMessage('Failed to add a puppy');
      }
    };
    addPuppy();
  };

  return (
    <section className="addpuppy__container">
      <div className="addpuppy__image">
        <img src={logo} width="200px" height="200px" alt="puppyphoto" />
      </div>

      <form onSubmit={handleSubmit} className="addpuppy__form">
        {message && <h2>{message}</h2>}
        <header className="addpuppy__heading">Add a new puppy</header>
        <input
          type="text"
          name="name"
          value={newPuppy.name}
          required
          onChange={handleChange}
          placeholder="Enter puppy name...."
        />
        <input
          type="text"
          name="breed"
          value={newPuppy.breed}
          required
          onChange={handleChange}
          placeholder="Enter breed name...."
        />
        <input
          type="date"
          name="birthDate"
          value={newPuppy.birthDate}
          onChange={handleChange}
          required
        />
        <button type="submit" className="addpuppy__button">
          Add
        </button>
      </form>
    </section>
  );
};

export default AddPuppy;
