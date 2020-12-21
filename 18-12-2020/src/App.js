import React, { useState } from "react";
import Cronometro from "./components/Cronometro/Cronometro.jsx";
import Clock from "./components/Clock/Clock.jsx";
import Buttons from "./components/Buttons/Buttons.jsx";
function App() {
  const [isHidden, setIsHidden] = useState(true);
  const handleButton = () => {
    setIsHidden(!isHidden);
  };
  const buttons = [{ label: "Cronômetro", handle: handleButton, id: 942 }];
  return (
    <main>
      <Clock />
      <Buttons buttons={buttons} />
      {!isHidden && <Cronometro />}
    </main>
  );
}

export default App;
