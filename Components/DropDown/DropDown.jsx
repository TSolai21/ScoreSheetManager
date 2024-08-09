import React from "react";

const DropDown = ({ options, call, selected, error, label, name }) => {
  const style = {};
  return (
    <>
      <select
        name={name}
        onChange={call}
        value={selected}
        style={{ borderColor: error ? "red" : "" }}
      >
        {options &&
          options.map((data, i) => {
            return (
              <option key={i} value={data}>
                {data}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default DropDown;
