import axios from "axios";
import apiUrl from '../environments/environment';

const getStudentListByCollegeId = async (_id) => {
  const url = apiUrl + 'students/?collegeId=' + _id;

  try {
    const response = await axios.get(url);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

const getSimilarCollegeList = async (college) => {
  const url = apiUrl + 'colleges/similar-colleges';

  try {
    const response = await axios.post(url, college);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

const getCollegeList = async (query) => {
  let url = apiUrl + 'colleges/';
  if (query && query.state) {
    url += '?state=' + query.state;
  } else if (query && query.course) {
    url += '?course=' + query.course;
  }

  try {
    const response = await axios.get(url);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

const getCollegesInEachStates = async () => {
  const url = apiUrl + 'colleges/stats?type=state';

  try {
    const response = await axios.get(url);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

const retrieveCollegesOffersEachCourse = async () => {
  const url = apiUrl + 'colleges/stats?type=course';

  try {
    const response = await axios.get(url);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export default {
  getCollegeList,
  getStudentListByCollegeId,
  getCollegesInEachStates,
  retrieveCollegesOffersEachCourse,
  getSimilarCollegeList
}