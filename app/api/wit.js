import env from '../env';
import * as intents from '../actions/intent';
import nodeWit from 'node-wit';

const session = '123abc'; // maybe use hash from node-uuid
const token = env.WIT_ACCESS_TOKEN;
const Wit = nodeWit.Wit;
const actions = {
  say(sessionId, context, message, cb) {
    console.log(message);
    cb();
  },
  merge(sessionId, context, entities, message, cb) {
    cb(context);
  },
  error(sessionId, context, error) {
    console.log(error.message);
  },
};
const client = new Wit(token, actions)

const witApi = {
  parse(msg) {
    return new Promise(resolve => {
      client.message(msg, (error, data) => {
        if (error) {
          console.log('Oops! Got an error: ' + error);
        } else {
          // Dispatch intent returned from Wit
          console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
          console.log('Returning counter intent for testing');
          resolve(intents.INTENT_COUNTER)
        }
      })
    })
  }
}

export default witApi
