import React from "react";

function Button({ label, handle }) {
  return (
    <button className='btn' onClick={handle}>
      {label}
    </button>
  );
}

export default Button;
