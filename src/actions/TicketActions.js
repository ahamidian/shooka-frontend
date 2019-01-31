import {getApi} from "../api";
import {convertToRaw} from "draft-js";

export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKET_SUCCESS = 'FETCH_TICKET_SUCCESS';
export const SEND_REPLY = 'SEND_REPLY';
export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';

export function loadTickets( pageSize=100,page=0,filter,sorted=[],onSuccess, onFailure) {
  return dispatch => {
    let ordering="";
    if(sorted.length>0){
      sorted.map((sortOption)=>ordering=ordering+(sortOption.desc?"-":"")+sortOption.id)
    }
    console.log(filter)
    return getApi().get(`ticket/?limit=${pageSize}&offset=${pageSize*page}${filter}&ordering=${ordering}`, true)
      .then(response => {
        if (onSuccess) {
          onSuccess(response.data);
        }
        dispatch({
          payload: {response:response.data,pageSize:pageSize},
          type: FETCH_TICKETS_SUCCESS
        });
      })
      .catch((resp) => {
        if (onFailure) {
          onFailure(resp.response);
        }
      });
  }
  // return dispatch => {
  //   return getApi().get(`ticket/${filter}`, true)
  //     .then(response => {
  //       if (onSuccess) {
  //         onSuccess(response.data);
  //       }
  //       dispatch({
  //         payload: response.data,
  //         type: FETCH_TICKETS_SUCCESS
  //       });
  //     })
  //     .catch((resp) => {
  //       if (onFailure) {
  //         onFailure(resp.response);
  //       }
  //     });
  // }
}

export function loadTicket(id, onSuccess, onFailure) {
  return dispatch => {
    return getApi().get(`ticket/${id}/`, true)
      .then(response => {
        if (onSuccess) {
          onSuccess(response.data);
        }
        dispatch({
          payload: response.data,
          type: FETCH_TICKET_SUCCESS
        });
      })
      .catch((resp) => {
        if (onFailure) {
          onFailure(resp.response);
        }
      });
  }
}

export function sendReply(ticketId, data, onSuccess, onFailure) {
  return dispatch => {
    return getApi().post(`message/`, data, true)
      .then(response => {

        if (onSuccess) {
          onSuccess(response.data);
        }
        dispatch({
          payload: response.data,
          type: SEND_REPLY
        });
      })
      .catch((resp) => {
        if (onFailure) {
          onFailure(resp.response);
        }
      });
  }
}

export function changeSettings(id, data, onSuccess, onFailure) {
  return dispatch => {
    getApi().patch(`ticket/${id}/`, data, true)
      .then(response => {
        if (onSuccess) {
          onSuccess(response.data);
        }
        dispatch({
          payload: response.data,
          type: CHANGE_SETTINGS
        });
      })
      .catch((resp) => {
        if (onFailure) {
          onFailure(resp.response);
        }
      });
  }
}

export function createTicket( data, onSuccess, onFailure) {
  return  dispatch => {
    return getApi().post(`message/`, data, false)
      .then(response => {

        if (onSuccess) {
          onSuccess(response.data);
        }
        dispatch({
          payload: response.data,
          type: SEND_REPLY
        });
      })
      .catch((resp) => {
        if (onFailure) {
          onFailure(resp.response);
        }
      });
  }
}
