import React from "react";
import { Link } from "react-router-dom";
import college from "../images/college.jpg";

const CollegeCard = (props) => {
  const { _id, name, email, addressLine, city, state, country, code } = props.college;

  return (
    <div className="item">
      <img className="ui avatar image" src={college} alt="college" />
      <div className="content">
        <Link
          to={{ pathname: `/colleges/${_id}`, state: { college: props.college } }}
        >
          <div className="header">{name} - {state}, {country}</div>
          <div>{addressLine}, {city}, {code}</div>
        </Link>
      </div>
    </div>
  );
};

export default CollegeCard;
