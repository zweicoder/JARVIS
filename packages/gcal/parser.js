import { INTENT_ADD_EVENT, INTENT_LIST_EVENTS } from './env';
import gcalApi from './api/google-calendar';
import wit from './api/wit'

/**
 * Resolves an intent and returns the component to render
 * @param result  intent parsed from wit.ai
 */
function resolveResult(result) {

  switch (result.intent) {
    case INTENT_ADD_EVENT:
      // Probably just render a screen and ask user to confirm
      const { event, start } = result.data;
      gcalApi.addEvent(event, start);
      return;
    case INTENT_LIST_EVENTS:
      gcalApi.getEvents();
      return;

    default:
      return;
  }
}

export default function parseMessage(app, message) {
  gcalApi.authorize(app.electron)
    .then(()=> {
      return wit.parse(message)
    })
    .then(result => {
      // add to calendar or list events
      return resolveResult(result);
    })
    .then(component => {
      // ID and props: {id: componentId, props: {}}
      app.addToRender(component)
    })
    .catch(e => {
      console.error('Error in gcal package: ', e)
    })

}
