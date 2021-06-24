import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actionTypes";
import jwt_decode from 'jwt-decode';
const user = JSON.parse(localStorage.getItem("token"));

const initialState = user 
  ? { isLoggedIn: true, user, isRole:checkRole(user) }
  : { isLoggedIn: false, user: null,isRole: null};

function checkRole(token) {
  const user = jwt_decode(token);
  let role = null;
  if (user.roles.some(e => e.titre === "ADMIN")) {
    role = 1;
  } else if (user.roles.some(e => e.titre === "RH")) {
    role = 2
  } else if (user.roles.some(e => e.titre === "MANAGER")) {
    role = 3
  } else {
    role = 4
  }
  return role;

}
export default function reducerAuthentification(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        isRole: checkRole(payload.user)
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isRole: null
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isRole: null
      };
    default:
      return state;
  }
}
