import {FETCH_AGENTS} from "../actions/AgentActions";

const initialState = {
  all: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_AGENTS:
      return {
        ...state,
        all: action.payload
      };

    default:
      return state;
  }
}
