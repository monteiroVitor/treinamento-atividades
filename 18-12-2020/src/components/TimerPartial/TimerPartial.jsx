import React from "react";

function TimerPartial({ partial, header }) {
  return (
    <section className='partial'>
      <h2>{header}</h2>
      <ul>
        {partial.map((partial, idx) => (
          <li key={idx}>{partial}</li>
        ))}
      </ul>
    </section>
  );
}

export default TimerPartial;
