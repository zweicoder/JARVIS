export const INTENT_COUNTER = 'intent_counter';
export const INTENT_ALARM = 'intent_alarm';
export const INTENT_REMINDER = 'intent_reminder';

export const ADD_TO_RENDER = 'add_to_render'
export function addToRender(intent) {
  return {
    type: ADD_TO_RENDER,
    data: intent
  }
}

export function resolveCounterIntent(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      // Decide whether or not to render, for example talk to wit
      // Here we'll just dispatch addToRender
      dispatch(addToRender(INTENT_COUNTER));
    }, delay);
  };
}
