const constants = {
  WIT_ACCESS_TOKEN: 'OORCEJHQLA5FOPUFERE6OKCMQUPMDB7E',

  INTENT_REMINDER: 'intent_reminder',
  INTENT_ALARM: 'intent_alarm',
  INTENT_COUNTER: 'intent_counter'
}

// TODO import from somewhere
const secret = {}

const settings = {}
const env = Object.assign({}, secret, constants)

export default env
