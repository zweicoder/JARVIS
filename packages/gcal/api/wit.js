import { WIT_ACCESS_TOKEN, INTENT_ADD_EVENT } from "../env";
import nodeWit from "node-wit";

const token = WIT_ACCESS_TOKEN;
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
const client = new Wit(token, actions);

const witApi = {
  parse(msg) {
    return new Promise((resolve, reject) => {
      // resolve(env.INTENT_ADD_EVENT);
      client.message(msg, (error, data) => {
        if (error) {
          return reject(error)
        }
        // Dispatch intent returned from Wit
        let { reminder, datetime } = data.outcomes[0].entities;
        if (!(reminder && datetime)) {
          return reject('Wit.ai was unable to understand the message')
        }

        [reminder, datetime] = [reminder[0], datetime[0]];
        if (datetime.type === 'interval') {
          // Weird bug from wit
          resolve({
            intent: INTENT_ADD_EVENT,
            data: {
              event: reminder.value,
              start: datetime.from.value
            }
          });
          return;
        }

        // Datetime.type is 'value'
        resolve({
          intent: INTENT_ADD_EVENT,
          data: {
            event: reminder.value,
            start: datetime.value
          }
        })

      })
    })
  }
};

export default witApi
