import {getApi} from "../api";

export const FETCH_AGENTS = 'fetchAgents';


export function fetchAgents(onSuccess, onFailure) {
  return  dispatch => {
    return getApi().get(`agent/`,true)
      .then(response => {
        dispatch({
          payload: response.data,
          type: FETCH_AGENTS
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
