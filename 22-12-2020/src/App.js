import React, { useState } from "react";
import Cronometro from "./components/Cronometro/Cronometro.jsx";
import Clock from "./components/Clock/Clock.jsx";
import Buttons from "./components/Buttons/Buttons.jsx";
import Temporizador from "./components/Temporizador/Temporizador.jsx";
function App() {
  const [isHiddenCronometro, setIsHiddenCronometro] = useState(true);
  const [isHiddenTemporizador, setIsHiddenTemporizador] = useState(true);

  const handleButtonCronometro = () => {
    setIsHiddenCronometro(!isHiddenCronometro);
  };

  const handleButtonTemporizador = () => {
    setIsHiddenTemporizador(!isHiddenTemporizador);
  };

  const buttons = [
    { label: "Cronômetro", handle: handleButtonCronometro, id: 942 },
    { label: "Temporizador", handle: handleButtonTemporizador, id: 944 },
  ];

  return (
    <main>
      <Clock />
      <Buttons buttons={buttons} />
      {!isHiddenCronometro && <Cronometro />}
      {!isHiddenTemporizador && <Temporizador />}
    </main>
  );
}

export default App;
