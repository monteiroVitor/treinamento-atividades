import React from "react";
import Display from "../Display/Display.jsx";
import moment from "moment-timezone";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clock: "" };
  }

  getTime() {
    const localTime = moment()
      .tz("America/Sao_Paulo")
      .format("HH:mm:ss")
      .toString();
    this.setState({ clock: localTime });
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getTime(), 1000);
  }
  render() {
    return <Display timer={this.state.clock} header={"Relógio"} />;
  }
}

export default Clock;
