import React, { useState, useEffect } from "react";
import Display from "../Display/Display.jsx";
import TimerPartial from "../TimerPartial/TimerPartial.jsx";
import { fullTimer } from "../../helpers/getTimer";
import Buttons from "../Buttons/Buttons.jsx";
import {
  initialValueTimer,
  timerInitialString,
} from "../../helpers/initialValue";

const Cronometro = () => {
  const [timer, setTimer] = useState(initialValueTimer);
  const [isTicking, setIsTicking] = useState(false);
  const [partial, setPartial] = useState([]);

  const timerString = fullTimer(
    timer.centesimos,
    timer.segundos,
    timer.minutos,
    timer.horas
  );

  const count = () => {
    if (isTicking) {
      setTimer((state) => {
        const { minutos, segundos, centesimos } = state;
        if (centesimos > 99)
          setTimer({ ...state, segundos: state.segundos + 1, centesimos: 0 });
        if (segundos > 59)
          setTimer({ ...state, minutos: state.minutos + 1, segundos: 0 });
        if (minutos > 59)
          setTimer({ ...state, horas: state.horas + 1, minutos: 0 });

        return { ...state, centesimos: state.centesimos + 1 };
      });
    }
  };

  const handleStartButton = () => {
    setIsTicking(true);
  };

  const handleStopButton = () => {
    setIsTicking(false);
  };

  const handleResetButton = () => {
    setIsTicking(false);
    setTimer(initialValueTimer);
    setPartial([]);
  };

  const handlePartialButton = () => {
    const newPartial = timerString;
    if (
      newPartial !== timerInitialString &&
      newPartial !== partial[partial.length - 1]
    )
      setPartial([...partial, newPartial]);
  };

  useEffect(() => {
    let interval = setInterval(count, 10);

    return () => clearInterval(interval);
  }, [isTicking]);

  const buttons = [
    { label: "Start", handle: handleStartButton, id: 931 },
    { label: "Stop", handle: handleStopButton, id: 312 },
    { label: "Zerar", handle: handleResetButton, id: 364 },
    { label: "Partial", handle: handlePartialButton, id: 346 },
  ];

  return (
    <>
      <Display timer={timerString} header={"Cronômetro"} />
      <Buttons buttons={buttons} />
      <TimerPartial partial={partial} header={"Parciais"} />
    </>
  );
};

export default Cronometro;
