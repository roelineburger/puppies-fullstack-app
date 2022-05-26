import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AddPuppy from './components/AddPuppy';
import Home from './components/Home';
import NavBar from './components/NavBar';
import PuppyDetails from './components/PuppyDetails';
import './App.css';

import { Puppy } from './types';
import EditPuppy from './components/EditPuppy';

function App() {
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const deletePuppy = async (id: number) => {
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `http://localhost:3010/api/puppies/${id}`,
      options,
    );

    if (response.ok) {
      setPuppies(prev => {
        const data = prev.filter(p => p.id !== id);
        return data;
      });
      navigate('/');
    } else {
      setErrorMessage('Unable to delete puppy...');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
  };

  useEffect(() => {
    const fetchPuppies = async () => {
      const response = await fetch('http://localhost:3010/api/puppies');
      const data = await response.json();

      setPuppies(data);
    };

    fetchPuppies();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home puppies={puppies} />}></Route>
        <Route
          path="/puppy/new"
          element={<AddPuppy puppies={puppies} />}
        ></Route>

        <Route
          path="/puppy/edit/:id"
          element={<EditPuppy puppies={puppies} setPuppies={setPuppies} />}
        ></Route>
        <Route
          path="/puppy/:id"
          element={
            <PuppyDetails
              puppies={puppies}
              deletePuppy={deletePuppy}
              errorMessage={errorMessage}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
