// APIs
export const URL_BASE = process.env['REACT_APP_EOBS_BACKEND_URL'] || 'http://localhost:8000/';
export const URL_PROFILE = URL_BASE + 'profile';
export const URL_SURVEY = URL_BASE + 'surveys';
export const SET_SURVEY_COMPANY = URL_BASE + 'company';
export const URL_SURVEY_LOGIN = URL_BASE + 'survey_admins';
export const URL_SURVEY_DETAIL = URL_BASE + 'survey_response';


// Responsive Action
export const SET_DIMENSION = 'SET_DIMENSION';
export const SET_VISIBLE_SIDEBAR = 'SET_VISIBLE_SIDEBAR';

// Authentication
export const SIGN_UP = 'SIGN_UP';
export const LOG_OUT = 'LOG_OUT';
export const SET_USER = 'SET_USER';

// Question
export const UPDATE_COMPANY_STATUS = 'UPDATE_COMPANY_STATUS';
export const UPDATE_ECONOMIC_GROWTH = 'UPDATE_ECONOMIC_GROWTH';
export const UPDATE_FINANCING = 'UPDATE_FINANCING';
export const UPDATE_INTELLECTUAL_PROPERTY = 'UPDATE_INTELLECTUAL_PROPERTY';
export const UPDATE_ENERGY_CHALLENGES = 'UPDATE_ENERGY_CHALLENGES';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const SAVE_INITIAL_QUESTION = 'SAVE_INITIAL_QUESTION';
export const SET_SUBMITTED = 'SET_SUBMITTED';
export const SET_CURRENCY = 'SET_CURRENCY';
export const RESET_QUESTION = 'RESET_QUESTION';

// Survey Admin
export const SET_SURVEY = 'SET_SURVEY';
export const SET_SURVEY_RESPONSE = 'SET_SURVEY_RESPONSE';
export const SET_SURVEY_NAME = 'SET_SURVEY_NAME';
export const SET_SURVEY_LOGIN_STATE = 'SET_SURVEY_LOGIN_STATE';

