import React, { useRef } from "react";
import CollegeCard from "./CollegeCard";

const CollegeList = (props) => {
  const inputEl = useRef("");

  const renderCollegeList = props.colleges.map((college) => {
    return (
      <CollegeCard
        college={college}
        key={college._id}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  return (
    <div className="main">
      <h2>
        College List
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Colleges"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>

      <div className="ui celled list">
        {renderCollegeList.length > 0
          ? renderCollegeList
          : "No Colleges available"}
      </div>
    </div>
  );
};

export default CollegeList;
