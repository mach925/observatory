import * as types from '../types';

const INITIAL_STATE = {
  surveys: [],
  survey_detail: [],
  survey_name: '',
  loggedIn: false,
  companies: []
};

const surveyReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {  
    case types.SET_SURVEY:
      return {
        ...state,
        surveys: action.payload
      }
    case types.SET_SURVEY_RESPONSE:
      return {
        ...state,
        survey_detail: action.payload
      }
    case types.SET_SURVEY_NAME:
      return {
        ...state,
        survey_name: action.payload
      }
    case types.SET_SURVEY_LOGIN_STATE:
      return {
        ...state,
        loggedIn: action.payload
      }
    case types.SET_SURVEY_COMPANY:
      return {
        ...state,
        companies: action.payload
      }
    default: 
      return state;
  }
}

export default surveyReducer;