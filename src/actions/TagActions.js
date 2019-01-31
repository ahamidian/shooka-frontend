import {getApi} from "../api";

export const FETCH_TAGS = 'fetchTags';


export function fetchTags(onSuccess, onFailure) {
  return  dispatch => {
    return getApi().get(`tag/`,true)
      .then(response => {
        dispatch({
          payload: response.data,
          type: FETCH_TAGS
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
