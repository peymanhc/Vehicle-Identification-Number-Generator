import { convertToArray } from "helper/objectConverters";

const Select = ({ value, handleChange, data, name }: SelectTypes) => {
  function processValue(value: unknown) {
    const strValue = value as string;
    return strValue;
  }
  return (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      className="form-select"
    >
      <option>Select one {name}</option>
      {convertToArray(data)?.map((item, i) => (
        <option key={i} value={processValue(item.value)}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
