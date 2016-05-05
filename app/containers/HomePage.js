import { connect } from "react-redux";
import Home from "../components/Home";
import React, { Component } from "react";
import * as IntentActions from "../actions/intent";
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

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(IntentActions, dispatch);
// }

// TODO this map should be generated somewhere, along with intent to component map
const intentActionMap = {
  [IntentActions.INTENT_COUNTER]: IntentActions.resolveCounterIntent()
};

function mapDispatchToProps(dispatch) {
  return { resolveIntent: (intent) => dispatch(intentActionMap[intent]) }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
