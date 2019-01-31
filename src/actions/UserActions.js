import {getApi} from "../api";

export const LOGIN = 'login';
export const LOGOUT = 'logout';


export function signIn(username, password, onSuccess, onFailure) {
  return  dispatch => {
    return getApi().post(`token/`, {username, password})
      .then(response => {
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        dispatch({
          payload: response.data,
          type: LOGIN
        });
        if (onSuccess) {
          onSuccess(response.data);
        }
      })
      .catch((resp) => {
        if (onFailure) {
          onFailure(resp.response);
        }
      });
  }
}
export function adminRegister(email,company_name, password, onSuccess, onFailure) {
  return  dispatch => {
    return getApi().post(`register/admin/`, {email,company_name, password})
      .then(response => {
        if (onSuccess) {
          onSuccess(response.data);
        }
        dispatch({
          payload: response.data,
          type: LOGIN
        });
        // if (resp.data && !resp.data['2fa']) dispatch(push('/dashboard'));
      })
      .catch((resp) => {
        if (onFailure) {
          onFailure(resp.response);
        }
      });
  }
}
export function agentRegister(invitation_key, password, onSuccess, onFailure) {
  return  dispatch => {
    return getApi().post(`register/agent/`, {invitation_key, password})
      .then(response => {
        if (onSuccess) {
          onSuccess(response.data);
        }
        dispatch({
          payload: response.data,
          type: LOGIN
        });
        // if (resp.data && !resp.data['2fa']) dispatch(push('/dashboard'));
      })
      .catch((resp) => {
        if (onFailure) {
          onFailure(resp.response);
        }
      });
  }
}
