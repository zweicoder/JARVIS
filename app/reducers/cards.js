import { ADD_TO_RENDER } from "../actions/intent";

export default function cards(state = [], action) {
  switch (action.type) {
    case ADD_TO_RENDER:
      return state.concat(action.data);
    default:
      return state;
  }
}
