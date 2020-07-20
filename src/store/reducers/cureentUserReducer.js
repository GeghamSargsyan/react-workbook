import {
  currentUserLoadingType,
  currentUserSuccessType,
  currentUserFailureType,
  currentUserResetType,
  currentUserUpdateType,
  currentUserInfoUpdateType,
} from '../types';

const initialState = {
  data: {},
  isLoading: false,
  errorMsg: '',
};

export function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case currentUserLoadingType:
      return {
        ...state,
        isLoading: true,
      };

    case currentUserSuccessType:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };

    case currentUserFailureType:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.errorMsg,
      };

    case currentUserUpdateType:
      return {
        ...state,
        data: {
          ...state.data,
          experience: action.payload,
        },
        isLoading: false,
        errorMsg: action.errorMsg,
      };

    case currentUserInfoUpdateType:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
        isLoading: false,
        errorMsg: action.errorMsg,
      };

    case currentUserResetType: return initialState;

    default:
      return state;
  }
}
