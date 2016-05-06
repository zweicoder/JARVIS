// This file should probably be dynamically generated base on a JSON spec

import { resolveCounterIntent } from '../actions/intent';
import CounterPage from "../containers/CounterPage";

export const INTENT_COUNTER = 'intent_counter';
export const INTENT_ALARM = 'intent_alarm';
export const INTENT_REMINDER = 'intent_reminder';

// Mapping from intent to component to be rendered
export const intentComponentMap = {
  [INTENT_COUNTER]: CounterPage
};

// Mapping from intent to the action dispatched
export const intentActionMap = {
  [INTENT_COUNTER]: resolveCounterIntent()
};



/**
 * KIV
v1. Every package will export a intentActionMap, which specifies the function
 we call to determine what component to render (via namespaced ID),
 and the corresponding ID to component mapping/ component path.

 Core dispatches message to package, specified in intentActionMap, which delegates a
 component (via ID) to be rendered. ID is added to card list and mapped via
 intentComponentMap.(possible to write the json of this out at all?)



 v2. Read through every package for that file, store in hashmap, generate a json
  or maybe .js for the react components. Autogenerate import statement based on path,
 assign a name,
 **/
