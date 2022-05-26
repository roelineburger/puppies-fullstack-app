import logo from '../images/puppies-logo.png';
import add from '../images/add.png';
import home from '../images/home.png';

import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="nav">
      <Link className="nav__link" to={'/'}>
        <img
          className="logo"
          src={logo}
          alt="pic_dog"
          width="150px"
          height="150px"
        />
      </Link>
      <ul className="nav__list">
        <li className="nav__item nav--home">
          <Link className="nav__link" to={'/'}>
            <img className="nav__icon" src={home} alt="home" />
            <p className="nav__text">Home</p>
          </Link>
        </li>
        <li className="nav__item nav--add">
          <Link className="nav__link" to={'/puppy/new'}>
            <img className="nav__icon" src={add} alt="add" />
            <p className="nav__text">Add</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
