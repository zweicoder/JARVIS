import Main from './components/card';
import parseMessage from './parser';
import env from './env';


// Mapping from intent to component to be rendered
export const intentComponentMap = {
  [env.MAIN_PAGE]: Main
};

// Mapping from intent to the action dispatched
export const intentActionMap = {
  'intent_reminder': parseMessage
};

