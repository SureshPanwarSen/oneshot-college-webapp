import React, { useEffect, useState } from "react";
import user from "../images/user.png";
import userProfile from "../images/user.jpg";
import "./App.css";

const StudentCard = (props) => {
  const { cpi, state, code, rollNumber, name, email, age, city, currentSemester, department, gender, skills, country, batchYear, addressLine } = props.student;

  const [visible, setVisible] = useState(false);
  let skillsLearned = '';

  if (skills && skills.length) {
    skills.forEach(skill => {
      skillsLearned += ` ${skill}`
    });
  }

  function Details() {
    return <div className="ui container">
      <img className="avatar image size space" src={userProfile} alt="userProfile" /> 
      <div className="ui content space">Department: {department} & Skills: {skillsLearned}</div>

      <table>
        <tbody>
          <tr key="basic" className="ui content">
            <td>Roll Number: {rollNumber}</td>
            <td>Age: {age}</td>
            <td>Gender: {gender}</td>
            <td>Email: {email}</td>
          </tr>
          <tr key="college" className="ui content">
            <td className="ui content">Address Line: {addressLine}</td>
            <td>Batch Year: {batchYear}</td>
            <td>Current Semester: {currentSemester}</td>
            <td>CPI: {cpi}</td>
          </tr>
          <tr key="address" className="ui content">
            <td className="ui content">City: {city}</td>
            <td className="ui content">State: {state}</td>
            <td className="ui content">Country: {country}</td>
            <td className="ui content">Code: {code}</td>
          </tr>
        </tbody>
      </table>
    </div>
  }

  return (
    <div className="item header pointer" onClick={() => setVisible(!visible)}>
      <div className="ui content">
        <img className="ui avatar container image" src={user} alt="user" /> {name} - {department}, {batchYear}
      </div>
      {visible && <Details />}
    </div>
  );
};

export default StudentCard;
