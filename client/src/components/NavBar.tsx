import React from "react";
import logo from "../profilepic.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <img src={logo} alt="pic_dog" width="150px" height="150px" />
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/puppy/new"}>Add Puppy</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
