import React from "react";
import StudentCard from "./StudentCard";

const StudentList = (props) => {
  const renderStudentList = props.students.map((student) => {
    return (
      <StudentCard
        student={student}
        key={student._id}
      />
    );
  });

  return (
    <div className="main">
      <h2>
        Student List
      </h2>
      <div className="ui celled list">
        {renderStudentList.length > 0
          ? renderStudentList
          : "No Students available"}
      </div>
    </div>
  );
};

export default StudentList;