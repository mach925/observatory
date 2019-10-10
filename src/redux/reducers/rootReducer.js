import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import homeReducer from './home';
import screenReducer from './screen';
import questionReducer from './question';
import surveyReducer from './survey';

const rootReducer = combineReducers({
  router: routerReducer,
  homeReducer,
  screenReducer,
  questionReducer,
  surveyReducer
});

export default rootReducer;
