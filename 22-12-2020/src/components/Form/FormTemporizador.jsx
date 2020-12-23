import React, { useState } from "react";
import { initialValueTimer } from "../../helpers/initialValue";

function FormTemporizador({ timer, setTimer, setIsformShowing }) {
  const [input, setInput] = useState(initialValueTimer);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTimer = {
      segundos: parseInt(input.segundos),
      minutos: parseInt(input.minutos),
      horas: parseInt(input.horas),
    };
    setTimer(newTimer);
    setIsformShowing(false);
  };

  return (
    <article>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='Horas'>Horas : </label>
          <input
            type='number'
            id='horas'
            name='horas'
            max='99'
            value={input.horas}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='minutos'>Minutos : </label>
          <input
            type='number'
            id='minutos'
            max='59'
            name='minutos'
            value={input.minutos}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='segundos'>Segundos : </label>
          <input
            type='number'
            id='segundos'
            max='59'
            name='segundos'
            value={input.segundos}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Iniciar</button>
      </form>
    </article>
  );
}

export default FormTemporizador;
