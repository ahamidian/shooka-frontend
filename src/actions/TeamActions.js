import {getApi} from "../api";

export const FETCH_TEAMS = 'fetchTeams';


export function fetchTeams(onSuccess, onFailure) {
  return  dispatch => {
    return getApi().get(`team/`,true)
      .then(response => {
        dispatch({
          payload: response.data,
          type: FETCH_TEAMS
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
