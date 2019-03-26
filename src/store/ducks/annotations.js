import { markActionsOffline } from 'redux-offline-queue';

export const Types = {
  ADD_REQUEST: 'annotations/ADD_REQUEST',
  ADD_SUCCESS: 'annotations/ADD_SUCCESS',
  ADD_ERROR: 'annotations/ADD_ERROR',
};

const initialState = {
  dataSynchronized: [],
  dataNotSynchronized: [],
  loading: false,
  success: null,
  error: null,
};

export default function annotations(state = initialState, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        success: '',
        error: '',
      };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        dataSynchronized: [...state.dataSynchronized, action.payload.annotation],
        loading: false,
        success: 'Informação salva com sucesso!',
        error: '',
      };
    case Types.ADD_ERROR:
      return {
        ...state,
        loading: false,
        success: '',
        error: action.payload.message,
      };
    default:
      return state;
  }
}

export const Creators = {
  addAnnotationRequest: annotation => ({
    type: Types.ADD_REQUEST,
    payload: {
      annotation,
    },
  }),

  addAnnotationSuccess: annotation => ({
    type: Types.ADD_SUCCESS,
    payload: {
      annotation,
    },
  }),

  addAnnotationError: message => ({
    type: Types.ADD_ERROR,
    payload: {
      message,
    },
  }),
};

markActionsOffline(Creators, ['addAnnotationRequest']);
