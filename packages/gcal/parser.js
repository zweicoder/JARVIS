export default function parseMessage(app, message) {
  wit.parse(message)
    .then(intent => {
      // add to calendar or list events
      performActionBasedOn(intent);
    })
    .then(component => {
      // ID and props: {id: componentId, props: {}}
      app.addToRender(component)
    })

}
