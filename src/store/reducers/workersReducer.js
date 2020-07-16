import { workersLoadingType, workersSuccessType, workersFailureType } from '../types';

const initialState = {
  data: [],
  isLoading: false,
  errorMsg: '',
};

export function workersReducer(state = initialState, action) {
  switch (action.type) {
    case workersLoadingType:
      return {
        ...state,
        isLoading: true,
      };

    case workersSuccessType:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };

    case workersFailureType:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.errorMsg,
      };

    default:
      return state;
  }
}
