import {FETCH_TAGS} from "../actions/TagActions";

const initialState = {
  all: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TAGS:
      return {
        ...state,
        all: action.payload
      };

    default:
      return state;
  }
}
