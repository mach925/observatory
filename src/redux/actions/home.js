import * as types from '../types';

export const setDimension = (dimension) => ({
  type: types.SET_DIMENSION,
  payload: dimension
})