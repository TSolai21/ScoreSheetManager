import React from "react";
const Button = ({ style, call, type = "button", arg, children, className }) => {
  return (
    <>
      <button
        type={type}
        className={className}
        style={style}
        onClick={call ? () => call(arg) : null}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
