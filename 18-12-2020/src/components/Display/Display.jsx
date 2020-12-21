import React from "react";

function Display({ header, timer }) {
  return (
    <div className='container'>
      <h1>{header}</h1>
      <p className='timer'>{timer}</p>
    </div>
  );
}

export default Display;
