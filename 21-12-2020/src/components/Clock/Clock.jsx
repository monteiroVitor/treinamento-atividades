import React, { useEffect, useState } from "react";
import Display from "../Display/Display.jsx";
import moment from "moment-timezone";

const initialState = moment()
  .tz("America/Sao_Paulo")
  .format("HH:mm:ss")
  .toString();

const Clock = () => {
  const [clock, setClock] = useState(initialState);

  const getTime = () => {
    const localTime = moment()
      .tz("America/Sao_Paulo")
      .format("HH:mm:ss")
      .toString();

    setClock(localTime);
  };

  useEffect(() => {
    setTimeout(getTime, 1000);
  }, [clock]);

  return <Display timer={clock} header={"Relógio"} />;
};

export default Clock;
