import React, { Component, PropTypes } from "react";
import styles from "./Home.css";

export default class Home extends Component {
  static propTypes:{
    cards: PropTypes.array.isRequired
    }

  render() {
    // TODO map each element in card array to their component
    const { cards, onInputKeyUp } = this.props;
    const cardComponents = cards.map(card => {
      // TODO get component
    })
    return (
      <div>
        <div className={styles.container}>
          <h2>Home</h2>


          <input
            type="text"
            onKeyUp={onInputKeyUp}
          />
        </div>
      </div>
    );
  }
}
