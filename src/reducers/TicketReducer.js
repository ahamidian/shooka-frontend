import {
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKET_SUCCESS,
    FETCH_FILTERS_SUCCESS,
  SEND_REPLY,
  CHANGE_SETTINGS
} from "../actions/TicketActions";
import _ from 'lodash'

const initialState = {
  tickets: [],
  filters: [],
  count: 0,
  pages:0,
  detailedTickets: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: action.payload.response.results,
        count: action.payload.response.count,
        pages: Math.ceil(action.payload.response.count/action.payload.pageSize),
      };
    case FETCH_TICKET_SUCCESS:
      return {
        ...state,
        detailedTickets: [...state.detailedTickets.concat(action.payload)],
      };
    case FETCH_FILTERS_SUCCESS:
        return {
            ...state,
            filters: action.payload,
        };
    case SEND_REPLY:
      let changedTicket=state.detailedTickets.find((ticket)=>ticket.id===action.payload.ticket);
      changedTicket.messages=[...changedTicket.messages,action.payload];
      return {
        ...state,
        detailedTickets: [...state.detailedTickets.map((ticket)=>ticket.id===action.payload.ticket?changedTicket:ticket)],
      };
    case CHANGE_SETTINGS:
      return {
        ...state,
        detailedTickets: [...state.detailedTickets.concat(action.payload)],
        tickets: [...state.tickets.map((ticket)=>ticket.id===action.payload.id?action.payload:ticket)],
      };
    default:
      return state;
  }
}
