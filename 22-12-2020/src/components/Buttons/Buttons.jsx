import React from "react";
import Button from "./Button.jsx";

function Buttons({ buttons }) {
  return (
    <section className='container'>
      {buttons.map((button) => (
        <Button handle={button.handle} key={button.id} label={button.label} />
      ))}
    </section>
  );
}

export default Buttons;
