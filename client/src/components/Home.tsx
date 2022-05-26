import { Puppy } from "../types";
import { Link } from "react-router-dom";

import dogIcon from "../images/dog-icon.png"

interface IHomeProps {
  puppies: Puppy[];
}

const Home = ({ puppies }: IHomeProps) => {
  return (
    <div>
      {puppies.map((p, i) => (
        <Link className="home__link" to={`/puppy/${p.id}`} key={p.id}>
          <div className={`home__card ${i % 2 === 0 ? 'even' : 'odd'}`} >
            <img className="home__dog-icon" src={dogIcon} alt="dog-icon" />
            <div className="home__name-wrapper">
              <h4 className="home__name">{p.name}</h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
