import { csrfFetch } from './csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const initialState = { user: null };

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

// const removeUser = () => {
//   return {
//     type: REMOVE_USER
//   };
// };

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, companyName, industrySector, email, password  } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName, 
      lastName, 
      username, 
      companyName, 
      industrySector, 
      email, 
      password 
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

export default sessionReducer;