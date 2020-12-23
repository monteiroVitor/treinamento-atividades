import React, { useState, useEffect } from 'react';
import Display from '../Display/Display.jsx';
import TimerPartial from '../TimerPartial/TimerPartial.jsx';
import { fullTimer } from '../../helpers/getTimer';
import Buttons from '../Buttons/Buttons.jsx';
import {
  initialValueTimer,
  timerInitialString,
} from '../../helpers/initialValue';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Cronometro = () => {
  const [timer, setTimer] = useState(initialValueTimer);
  const [isTicking, setIsTicking] = useState(false);
  const [partial, setPartial] = useState([]);
  const { value, setValue } = useLocalStorage('partial');

  const timerString = fullTimer(
    timer.centesimos,
    timer.segundos,
    timer.minutos,
    timer.horas
  );

  const count = () => {
    if (isTicking) {
      setTimer((state) => {
        let { minutos, segundos, centesimos, horas } = state;
        if (centesimos > 99) {
          segundos += 1;
          centesimos = 0;
        }
        if (segundos > 59) {
          minutos += 1;
          segundos = 0;
        }
        if (minutos > 59) {
          horas += 1;
          minutos = 0;
        }

        centesimos += 1;
        return { centesimos, minutos, segundos, horas };
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
    setValue([]);
    localStorage.removeItem('partial');
  };

  const handlePartialButton = () => {
    const newPartial = timerString;
    if (
      newPartial !== timerInitialString &&
      newPartial !== partial[partial.length - 1]
    )
      setValue([...value, newPartial]);
  };

  useEffect(() => {
    let interval = setInterval(count, 10);

    return () => clearInterval(interval);
  }, [isTicking]);

  const buttons = [
    { label: 'Start', handle: handleStartButton, id: 931 },
    { label: 'Stop', handle: handleStopButton, id: 312 },
    { label: 'Zerar', handle: handleResetButton, id: 364 },
    { label: 'Partial', handle: handlePartialButton, id: 346 },
  ];

  return (
    <>
      <Display timer={timerString} header={'Cronômetro'} />
      <Buttons buttons={buttons} />
      <TimerPartial partial={value} header={'Parciais'} />
    </>
  );
};

export default Cronometro;
