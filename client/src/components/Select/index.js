import React from "react";

const Select = ({ value, handleChange, data, name }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      className="form-select"
    >
      <option>Select one {name}</option>
      {data.map((item, i) => (
        <option key={i} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
