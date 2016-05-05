import React, { Component, PropTypes } from "react";
import styles from "./Home.css";
import electron from "electron";
import authorizeGcal from '../../packages/gcal/index';
// import auth from '../api/google-auth2';

export default class Home extends Component {
  static propTypes:{
    cards: PropTypes.array.isRequired
    };

  constructor(props) {
    super(props)
    this.testOauth = this.testOauth.bind(this)
  }

  testOauth() {
    authorizeGcal(electron)
  }

  render() {
    const { cards, onInputKeyUp } = this.props;
    const cardComponents = cards.map(card => {
      // TODO get component
      return <div> TEST COMPONENT</div>
    });

    return (
      <div>
        <div className={styles.container}>
          <h2>Home</h2>
          <button onClick={this.testOauth}>CLICK ME</button>
          {cardComponents}
          <input
            type="text"
            onKeyUp={onInputKeyUp}
          />
        </div>
      </div>
    );
  }
}
