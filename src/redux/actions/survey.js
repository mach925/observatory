import Axios from 'axios';
import * as types from '../types';

export const loginSurveyAdmin = (param, callback) => (dispatch) => {
  Axios.get(types.URL_SURVEY_LOGIN + '?email=' + param.email)
  .then((res) => {
    console.log(res.data);
    if(res.data.length > 0 && res.data[0].password === param.password) {
      callback('success');
      dispatch({
        type: types.SET_SURVEY_LOGIN_STATE,
        payload: true
      })
    } else if(res.data.length === 0) {
      callback('Unregistered User!');
    } else {
      callback('Invalid Password!')
    }
  })
  .catch((e) => console.log(e));
}

export const fetchSurveys = () => (dispatch) => {
  Axios.get(types.URL_SURVEY)
  .then((res) => {
    console.log('Surveys: ', res.data);
    dispatch({
      type: types.SET_SURVEY,
      payload: res.data
    })
  })
  .catch((e) => console.log(e));
}

export const fetchCompanies = () => (dispatch) => {
  Axios.get(types.SET_SURVEY_COMPANY)
  .then((res) => {
    console.log('Company data: ', res.data);
    dispatch({
      type: types.SET_SURVEY_COMPANY,
      payload: res.data
    })
  })
  .catch((e) => console.log(e));
}

export const fetchSurveyDetail = (id) => (dispatch) => {
  Axios.get(types.URL_SURVEY + '?id=' + id)
  .then((res) => {
    console.log(res.data);
    dispatch({
      type: types.SET_SURVEY_NAME,
      payload: res.data[0].name
    })
  })
  .catch((e) => console.log(e));
  
  Axios.get(types.URL_SURVEY_DETAIL + '?id=' + id)
  .then((res) => {
    console.log(res.data);
    dispatch({
      type: types.SET_SURVEY_RESPONSE,
      payload: res.data
    })
  })
  .catch((e) => console.log(e));
}