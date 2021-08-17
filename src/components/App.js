import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import api from "../api/colleges";
import Header from "./Header";
import CollegeList from "./CollegeList";
import CollegeDetail from "./CollegeDetail";
import PieChart from "./PieChart";

function App() {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [state, setStateTerm] = useState([]);
  const [course, setCourseTerm] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [showStateChart, setChartVisibility] = useState(false);
  const [isShowCharts, isChartsVisibility] = useState(true);

  const retrieveCollegesInEachStates = async () => {
    return await api.getCollegesInEachStates();
  };

  const retrieveCollegesOffersEachCourse = async () => {
    return await api.retrieveCollegesOffersEachCourse();
  };

  const retrieveColleges = async (filter) => {
    return await api.getCollegeList(filter);
  };

  const visibilityHandler = (value) => {
    isChartsVisibility(value);
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== "") {
      const newCollegeList = colleges.filter((college) => {
        return Object.values(college)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });

      setSearchResults(newCollegeList);
    } else {
      setSearchResults(colleges);
    }
  };

  const stateHandler = (state) => {
    setStateTerm(state);

    if (state && state.name) {
      setStateTerm(course.name);

      const getAllStates = async () => {
        const allColleges = await retrieveColleges({ state: state.name });
        if (allColleges) setColleges(allColleges);
      };

      getAllStates();
    } else {
      setSearchResults(colleges);
    }
  };

  const courseHandler = (course) => {
    setCourseTerm(course);
    if (course && course.name) {
      setCourseTerm(course.name);

      const getAllCourses = async () => {
        const allColleges = await retrieveColleges({ course: course.name });
        if (allColleges) setColleges(allColleges);
      };

      getAllCourses();
    } else {
      setSearchResults(colleges);
    }
  };

  useEffect(() => {
    const getAllColleges = async () => {
      const allColleges = await retrieveColleges({});
      if (allColleges) setColleges(allColleges);
      const stateStatics = await retrieveCollegesInEachStates('state');
      if (stateStatics) setStateData(stateStatics);
      const courseStatics = await retrieveCollegesOffersEachCourse('course');
      if (courseStatics) setCourseData(courseStatics);
    };

    getAllColleges();
  }, []);

  useEffect(() => {
  }, [colleges]);

  const [theme, setTheme] = useState('dark')

  const handleThemeChange = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <div className="ui container center">
      {isShowCharts}
      <div className="header main">
        {showStateChart ? 'To understand charts -> It shows percentage based on number of colleges in each states based on total number of colleges' : 'To understand this chart -> It shows percentage of each course based on how many colleges offers this course as we know multiple courses can be provided by same college so the sum of all percentage can exceed 100%'}
      </div>
      <div className="content center-div space main">
        <div className="ui header"></div>
        <div className="ui button blue center" onClick={() => setChartVisibility(!showStateChart)}>
          {showStateChart ? 'Showing chart by State -> Click to see Course Chart' : 'Showing chart by Course -> Click to see State Chart'}
        </div>

        <p className="space">On click on the area of charts filtered list of colleges will be displayed.</p>

        {showStateChart &&
          <PieChart
            path="/"
            exact
            theme={theme}
            data={stateData}
            handleThemeClick={handleThemeChange}
            stateHandler={stateHandler}
          />
        }

        {!showStateChart &&
          <PieChart
            path="/"
            exact
            theme={theme}
            data={courseData}
            handleThemeClick={handleThemeChange}
            courseHandler={courseHandler}
          />
        }
      </div>

      <div>
        <Router>
          <Header />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <CollegeList
                  {...props}
                  colleges={searchTerm.length < 1 ? colleges : searchResults}
                  term={searchTerm}
                  searchKeyword={searchHandler}
                  visibilityHandler={visibilityHandler}
                />
              )}
            />
            <Route path="/colleges/:_id" component={CollegeDetail} />
          </Switch>
        </Router>
      </div>

    </div>
  );
}

export default App;
