import {FETCH_TEAMS} from "../actions/TeamActions";

const initialState = {
  all: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TEAMS:
      return {
        ...state,
        all: action.payload
      };

    default:
      return state;
  }
}
