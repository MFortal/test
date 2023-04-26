import React from "react";
import Select from "react-select";

export default ({
  onChange,
  options,
  className,
  styles,
  defaultValue,
  isDisabled = false,
}) => {
  // const getDefaultValue = (options, value) => {
  //   return options ? options.find((option) => option.value === value) : "";
  // };

  return (
    <Select
      defaultValue={defaultValue}
      //value={getDefaultValue(options, defaultValue)}
      onChange={(value) => onChange(value)}
      options={options}
      className={className}
      styles={styles}
      isDisabled={isDisabled}
    />
  );
};
