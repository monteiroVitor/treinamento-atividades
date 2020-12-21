import React from "react";
import Display from "../Display/Display.jsx";
import TimerPartial from "../TimerPartial/TimerPartial.jsx";
import { fullTimer } from "../../helpers/getTimer";
import Buttons from "../Buttons/Buttons.jsx";

class Cronometro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centesimos: 0,
      segundos: 0,
      minutos: 0,
      horas: 0,
      isTicking: false,
      partial: [],
    };
    this.handlePartialButton = this.handlePartialButton.bind(this);
    this.handleStartButton = this.handleStartButton.bind(this);
    this.handleStopButton = this.handleStopButton.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  count() {
    if (this.state.isTicking) {
      const resetTimer = this.reset();
      const incrementTimer = this.increment();
      this.setState((state) => {
        const { minutos, segundos, centesimos } = state;
        if (centesimos > 99) {
          resetTimer.centesimos();
          incrementTimer.seconds();
        }
        if (segundos > 59) {
          resetTimer.seconds();
          incrementTimer.minutes();
        }
        if (minutos > 59) {
          resetTimer.minutes();
          incrementTimer.hours();
        }
        return { centesimos: centesimos + 1 };
      });
    }
  }

  increment() {
    return {
      seconds: () =>
        this.setState((state) => {
          return { segundos: state.segundos + 1 };
        }),
      minutes: () =>
        this.setState((state) => {
          return { minutos: state.minutos + 1 };
        }),
      hours: () => () =>
        this.setState((state) => {
          return { horas: state.horas + 1 };
        }),
    };
  }

  handlePartialButton() {
    const { minutos, segundos, horas, centesimos, partial } = this.state;
    const newPartial = fullTimer(centesimos, segundos, minutos, horas);

    if (
      newPartial !== "00:00:00:00" &&
      newPartial !== partial[partial.length - 1]
    )
      this.setState({ partial: [...this.state.partial, newPartial] });
  }

  handleStartButton() {
    this.setState({ isTicking: true });
  }

  handleStopButton() {
    this.setState({ isTicking: false });
  }

  resetTimer() {
    this.setState({
      centesimos: 0,
      segundos: 0,
      minutos: 0,
      horas: 0,
      isTicking: false,
      partial: [],
    });
  }

  reset() {
    return {
      centesimos: () => this.setState({ centesimos: 0 }),
      seconds: () => this.setState({ segundos: 0 }),
      minutes: () => this.setState({ minutos: 0 }),
      hours: () => this.setState({ horas: 0 }),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.count(), 10);
  }

  render() {
    const { minutos, segundos, horas, centesimos, partial } = this.state;
    const timer = fullTimer(centesimos, segundos, minutos, horas);
    const buttons = [
      { label: "Start", handle: this.handleStartButton, id: 931 },
      { label: "Stop", handle: this.handleStopButton, id: 312 },
      { label: "Zerar", handle: this.resetTimer, id: 364 },
      { label: "Partial", handle: this.handlePartialButton, id: 346 },
    ];
    return (
      <>
        <Display timer={timer} header={"Cronômetro"} />
        <Buttons buttons={buttons} />
        <TimerPartial partial={partial} header={"Parciais"} />
      </>
    );
  }
}

export default Cronometro;
