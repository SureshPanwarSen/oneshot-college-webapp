import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import college from "../images/college.jpg";
import api from "../api/colleges";
import StudentList from "./StudentList";

const CollegeDetail = (props) => {
  const { _id, name, email, state, city, code, country, addressLine, foundedYear, departments, courses, ratings, totalStudents } = props.location.state.college;
  const currentCollege = props.location.state.college;

  let coursesOffered = '';
  if (courses && courses.length) {
    courses.forEach(course => {
      coursesOffered += ` ${course}`;
    });
  }

  let departmentsAvailable = '';
  if (departments && departments.length) {
    departments.forEach(department => {
      departmentsAvailable += ` ${department}`;
    });
  }

  const [students, setStudents] = useState([]);
  const [colleges, setColleges] = useState([]);

  const retrieveStudents = async () => {
    return await api.getStudentListByCollegeId(_id);
  };

  const retrieveSimilarColleges = async () => {
    return await api.getSimilarCollegeList(currentCollege);
  };

  useEffect(() => {
    const getAllStudents = async () => {
      const allStudents = await retrieveStudents();
      if (allStudents) setStudents(allStudents);
    };
    getAllStudents();

    const getSimilarColleges = async () => {
      const allColleges = await retrieveSimilarColleges();
      if (allColleges) setColleges(allColleges)
    };

    getSimilarColleges();
  }, []);

  function buildTable() {
    const SimilarCollegeList = colleges.map((college) => {
      let courses = ''
      for (let i = 0; i < college.courses.length; i++) {
        courses += college.courses[i] + ' ';
      }
      let departments = ''
      for (let i = 0; i < college.departments.length; i++) {
        departments += college.departments[i] + ' ';
      }

      return <tr key={college._id}><td>{college.name}</td><td>{college.state}</td><td>{college.totalStudents}</td><td>{college.ratings}</td><td>{departments}</td><td>{courses}</td></tr>
    })

    return <table>
      <tbody>
        <tr key="header"><td> College Name </td><td> State </td><td> total Students </td><td> Rating </td><td> Departments </td><td> Courses </td></tr>
        {SimilarCollegeList}
      </tbody>
    </table>
  }

  const table = buildTable();

  useEffect(() => {
  }, [students]);

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={college} alt="college" />
        </div>
        <div className="content">
          <div className="header space">{name} - {state}, {country}</div>
          <div className="description space">{addressLine}, {city}, {code}</div>
          <div className="description space">Contact Email: {email}</div>
          <div className="description space">Total Students: {totalStudents}</div>
          <div className="description space">Founded Year: {foundedYear}</div>
          <div className="description space">Departments: {departmentsAvailable}</div>
          <div className="description space">Courses: {coursesOffered}</div>
          <div className="description space">Ratings: {ratings}</div>
        </div>
      </div>

      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to College List
          </button>
        </Link>
      </div>

      <Router>
        <Switch>
          <Route
            render={(props) => (
              <StudentList
                {...props}
                students={students}
              />
            )}
          />
        </Switch>
      </Router>

      <div className="center-div space">
        <div className="ui header">List Of Similar Colleges</div>
        {table}
      </div>
    </div>
  );
};

export default CollegeDetail;
