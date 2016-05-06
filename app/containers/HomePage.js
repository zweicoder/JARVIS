import { connect } from "react-redux";
import Home from "../components/Home";
import React, { Component } from "react";
import * as intents from "../api/intents";
import wit from "../api/wit";


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.checkEnter = this.checkEnter.bind(this)
  };

  checkEnter(e) {
    const { resolveIntent } = this.props;
    if (e.key == 'Enter') {
      const val = e.target.value.trim();
      if (val) {
        // Dispatch wit service
        wit.parse(val)
          .then(intent => {
            if (!intent) {
              console.log('No intent for input.');
              return;
            }

            // Dispatch according to intent
            // this.props.dispatch(IntentActions.resolveCounterIntent)
            resolveIntent(intent)
          })
          .catch(e => {
            console.log(e);
          });

        e.target.value = ''
      }
    }
  };

  render() {
    return <Home
      onInputKeyUp={this.checkEnter}
      cards={this.props.cards}/>
  };
}

function mapStateToProps(state) {
  return {
    cards: state.cards
  };
}


function mapDispatchToProps(dispatch) {
  return { resolveIntent: (intent) => dispatch(intents.intentActionMap[intent]) }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
