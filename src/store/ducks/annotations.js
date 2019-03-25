export const Types = {
  GET_REQUEST: 'annotations/GET_REQUEST',
  GET_SUCCESS: 'annotations/GET_SUCCESS',
  GET_ERROR: 'annotations/GET_ERROR',
  ADD_REQUEST: 'annotations/ADD_REQUEST',
  ADD_SUCCESS: 'annotations/ADD_SUCCESS',
  ADD_FAILURE: 'annotations/ADD_FAILURE',
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
    case Types.GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        dataSynchronized: action.payload.dataSynchronized,
        dataNotSynchronized: action.payload.dataNotSynchronized,
        loading: false,
        error: '',
      };
    case Types.GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case Types.ADD_REQUEST:
      return {
        ...state,
        loading: true,
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
    case Types.ADD_FAILURE:
      return {
        ...state,
        dataNotSynchronized: [...state.dataNotSynchronized, action.payload.annotation],
        loading: false,
        success: 'Informação salva localmente!',
        error: '',
      };
    case Types.ADD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
}

export const Creators = {
  getAnnotationRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  getAnnotationSuccess: (dataSynchronized, dataNotSynchronized) => ({
    type: Types.GET_SUCCESS,
    payload: {
      dataSynchronized,
      dataNotSynchronized,
    },
  }),

  getAnnotationError: message => ({
    type: Types.GET_ERROR,
    payload: {
      message,
    },
  }),

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

  addAnnotationFailure: annotation => ({
    type: Types.ADD_FAILURE,
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
