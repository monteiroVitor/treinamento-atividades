import React, { useState, useEffect } from "react";
import Form from "../Form/FormTemporizador.jsx";
import Display from "../Display/Display.jsx";
import Buttons from "../Buttons/Buttons.jsx";

import { initialValueTimer } from "../../helpers/initialValue";
import { getHours, getMinutes, getSeconds } from "../../helpers/getTimer";

function Temporizador() {
  const [timer, setTimer] = useState(initialValueTimer);
  const [message, setMessage] = useState('');
  const [isTicking, setIsTicking] = useState(false);
  const [isFormShowing, setIsformShowing] = useState(true);

  const timerString = `${getHours(timer.horas)}:${getMinutes(
    timer.minutos
  )}:${getSeconds(timer.segundos)}`;

  const countdown = () => {
    if (isTicking) {
      setTimer(state => {
        let {minutos, segundos, horas} = state;

        if(segundos < 1 && minutos !== 0) {
          segundos = 60;
          minutos -= 1;
        }
        
        if(minutos < 1 && horas !== 0){
          minutos = 60;
          horas -= 1;
        }
        
        if(!segundos && !minutos && !horas){
          setMessage('Time is Over');
          return {minutos,segundos,horas};
        }
        
        segundos -= 1;
        return {minutos, segundos,horas};
      })
    }
  };

  const handleStartButton = () => {
    setIsTicking(true);
  };

  const handleStopButton = () => {
    setIsTicking(false);
  };

  const handleNewButton = () => {
    setTimer(initialValueTimer);
    setIsTicking(false);
    setIsformShowing(true);
  };

  const buttons = [
    { label: "Start", handle: handleStartButton, id: 3812 },
    { label: "Stop", handle: handleStopButton, id: 3815 },
    { label: "Novo", handle: handleNewButton, id: 8931 },
  ];
  useEffect(() => {
    setTimeout(countdown, 1000);
  }, [isTicking, timer]);

  return (
    <section className='container'>
      <Display timer={timerString} header='Temporizador' />
      {isFormShowing ? (
        <Form
          timer={timer}
          setTimer={setTimer}
          setIsformShowing={setIsformShowing}
        />
      ) : (
        <Buttons buttons={buttons} />
      )}
    </section>
  );
}

export default Temporizador;
