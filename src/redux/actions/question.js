import axios from 'axios';
import * as types from '../types';

export const updateCompanyStatus = (data) => ({
  type: types.UPDATE_COMPANY_STATUS,
  payload: data
})

export const updateEconomicGrowth = (data) => ({
  type: types.UPDATE_ECONOMIC_GROWTH,
  payload: data
})

export const updateFinancing = (data) => ({
  type: types.UPDATE_FINANCING,
  payload: data
})

export const updateIntellectualProperty = (data) => ({
  type: types.UPDATE_INTELLECTUAL_PROPERTY,
  payload: data
})

export const updateEnergyChallenges = (data) => ({
  type: types.UPDATE_ENERGY_CHALLENGES,
  payload: data
})

export const updateQuestion = (data) => ({
  type: types.UPDATE_QUESTION,
  payload: data
})

export const setSubmitted = (value) => ({
  type: types.SET_SUBMITTED,
  payload: value
})

export const changeCurrency = (currency) => ({
  type: types.SET_CURRENCY,
  payload: currency
})

export const resetQuestions = (initialData = {}) => ({
  type: types.RESET_QUESTION,
  payload: initialData
})

export const loadAnswers = (hash_key) => dispatch => {
  axios.get(types.URL_BASE + hash_key)
  .then((res) => {
    console.log(res);
    dispatch({
      type: types.UPDATE_QUESTION,
      payload: {
        ...res.data,
        partnerShip: typeof res.data.company_status.partnerShip === 'object' ? 'Yes' : res.data.company_status.partnerShip,
        hasPatent: typeof res.data.intellectual_property.patentList === 'object' ? 'Yes' : res.data.intellectual_property.patentList,
        hasPlan: typeof res.data.intellectual_property.planList === 'object' ? 'Yes' : res.data.intellectual_property.planList,
        hasPlanToRaiseFunds: isNaN(res.data.financing.havePlan) ? res.data.financing.havePlan : 'Yes'
      }
    });
  })
  .catch((e) => {
    console.log(e.toString());
  })
}

export const signup = (param, callback) => (dispatch, getState) => {
  const state = getState();
  const hashKey = state.questionReducer.hashKey;

  axios.get(types.URL_PROFILE + '?hashKey=' + hashKey)
  .then((res) => {
    console.log('user data:', res)
    if(res.data !== undefined && res.data.length > 0) dispatch(updateUser(res.data, param));
    else dispatch(registerUser(param));
    callback('success');
  })
}

export const registerUser = (param) => (dispatch, getState) => {
  const state = getState();
  axios.post(types.URL_PROFILE, {
    ...param,
    hashKey: state.questionReducer.hashKey
  })
  .then((res) => {
    console.log('Registered user', res);
  })
  .catch((e) => {
    console.log(e.toString());
  })
}

export const updateUser = (user, param) => (dispatch, getState) => {
  const state = getState();
  axios.put(types.URL_PROFILE + '/' + user[0].id, {
    ...param,
    hashKey: state.questionReducer.hashKey
  })
  .then((res) => {
    console.log('Updated user', res);
  })
  .catch((e) => {
    console.log(e.toString());
  })
}

export const saveQuestions = () => (dispatch, getState) => {
  const state = getState();
  const param = getSections(state.questionReducer);
  axios.put(types.URL_BASE + state.questionReducer.hashKey, param)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e.toString());
  })
}

const getSections = (questions) => {
  return {
    initial: questions.initial,
    company_status: questions.company_status,
    economic_growth: questions.economic_growth,
    financing: questions.financing,
    intellectual_property: questions.intellectual_property,
    energy_challenges: questions.energy_challenges
  }
}