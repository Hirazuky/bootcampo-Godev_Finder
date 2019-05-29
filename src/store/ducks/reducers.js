/**
 * Types
 */

export const Types = {
  ADD_REQUEST: "reducers/ADD_REQUEST",
  ADD_SUCCESS: "reducers/ADD_SUCCESS",
  ADD_FAILURE: "reducers/ADD_FAILURE",
  OPEN_MODAL: "reducers/OPEN_MODAL",
  CLOSE_MODAL: "reducers/CLOSE_MODAL",
  CLOSE_USER: "reducers/CLOSE_USER"
};

/**
 * Reducers
 */

const INITIAL_STATE = {
  repos: [],
  loading: false,
  error: null,
  showModal: false,
  latClick: null,
  longClick: null
};

export default function reducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.OPEN_MODAL:
      return {
        ...state,
        showModal: true,
        latClick: action.payload.lat,
        longClick: action.payload.long
      };
    case Types.CLOSE_MODAL:
      return { ...state, showModal: false, latClick: null, longClick: null };
    case Types.CLOSE_USER:
      console.log(state.repos.filter(repo => repo.id !== action.payload.id));
      return {
        ...state,
        repos: [...state.repos.filter(repo => repo.id !== action.payload.id)]
      };
    case Types.ADD_REQUEST:
      return { ...state, loading: true, error: null };
    case Types.ADD_SUCCESS:
      const data = {
        ...action.payload.data,
        lat: action.payload.lat,
        long: action.payload.long
      };
      return {
        ...state,
        loading: false,
        error: null,
        showModal: false,
        repos: [...state.repos, data]
      };
    case Types.ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

/**
 * actions
 */

export const Actions = {
  openModal: (lat, long) => ({
    type: Types.OPEN_MODAL,
    payload: { lat, long }
  }),

  closeModal: () => ({
    type: Types.CLOSE_MODAL
  }),

  closeUser: id => ({
    type: Types.CLOSE_USER,
    payload: { id }
  }),

  addRepositoryRequest: (repository, lat, long) => ({
    type: Types.ADD_REQUEST,
    payload: { repository, lat, long }
  }),

  addRepositorySuccess: (data, lat, long) => ({
    type: Types.ADD_SUCCESS,
    payload: { data, lat, long }
  }),

  addRepositoryFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error }
  })
};
