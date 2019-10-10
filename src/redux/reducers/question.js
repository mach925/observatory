import * as types from '../types';

export const INITIAL_QUESTION_STATE = {
  company_status: {
    stage: '',
    employeeCount: '',
    operateList: [{
      country: '', 
      from: '',
      to: 'Still operating'
    }],
    businessType: '',
    sectorList: [{
      level1: '',
      level2: '',
      level3: ''
    }],
    JobCount2018: '',
    fullTimeJobCount2018: '',
    JobCount2019: '',
    fullTimeJobCount2019: '',
    partnerShip: {},
  },
  economic_growth: {
    salesAmount: '',
    salesPercentage: '',
    salesForecastCount: ''
  },
  financing: {
    fundsList: [{
      amount: '',
      type: '',
      country: '',
      year: ''
    }],
    percentage: '',
    havePlan: ''
  },
  intellectual_property: {
    patentList: '',
    planList: ''
  },
  energy_challenges: {
    decreaseCost: '',
    increaseEnergy: '',
    decreaseFootprint: '',
    decreaseCost_description: '',
    increaseEnergy_description: '',
    decreaseFootprint_description: ''
  },
  partnerShip: '',
  hasPlanToRaiseFunds: '',
  hasPatent: '',
  hasPlan: '',
  initial: {
    company: '',
    country: 'United Kingdom',
    region: '',
    activity: '',
    numberOfCoFounder: '0',
    incorporatedYear: new Date().getFullYear().toString(),
    incubation: '',
    website: '',
    name: '',
    surname: '',
    position: '',
    email: '',
  },
  submitted: false,
  currency: { label: "US Dollar ($)", value: '$'},
  total_required_question_count: 17,
  hashKey: ''
};

const questionReducer = (state = INITIAL_QUESTION_STATE, action) => {
  switch(action.type) { 
    case types.UPDATE_COMPANY_STATUS:
      return {
        ...state,
        company_status: {
          ...state.company_status,
          ...action.payload
        }
      }
    case types.UPDATE_ECONOMIC_GROWTH:
      return {
        ...state,
        economic_growth: {
          ...state.economic_growth,
          ...action.payload
        }
      }
    case types.UPDATE_FINANCING:
      return {
        ...state,
        financing: {
          ...state.financing,
          ...action.payload
        }
      }
    case types.UPDATE_INTELLECTUAL_PROPERTY:
      return {
        ...state,
        intellectual_property: {
          ...state.intellectual_property,
          ...action.payload
        }
      }
    case types.UPDATE_ENERGY_CHALLENGES:
      return {
        ...state,
        energy_challenges: {
          ...state.energy_challenges,
          ...action.payload
        }
      }
    case types.UPDATE_QUESTION:
      return {
        ...state,
        ...action.payload
      }
    case types.SAVE_INITIAL_QUESTION:
      return {
        ...state,
        initial: {
          ...state.initial,
          ...action.payload
        }        
      }
    case types.SET_SUBMITTED:
      return {
        ...state,
        submitted: action.payload
      }
    case types.SET_CURRENCY:
      return {
        ...state,
        currency: action.payload
      }
    case types.RESET_QUESTION:
      return {
        ...INITIAL_QUESTION_STATE,
        ...action.payload
      };
    default: 
      return state;
  }
}

export default questionReducer;