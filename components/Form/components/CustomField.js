import { Field } from "formik";
import { useState } from "react";

export const CustomField = ({
  textName,
  name,
  value,
  type = "text",
  placeholder = "",
  required = false,
  touched = false,
  error = false,
  isSecret = false,
  props,
  additionErrors = {},
}) => {
  const [visible, setVisible] = useState();

  return (
    <label className="label_box label_box_border">
      {required && (
        <>
          <span className="red_star">*</span>&nbsp;&nbsp;
        </>
      )}
      {textName}
      <div className="label_box_div">
        <Field
          type={isSecret ? (visible ? "text" : "password") : type}
          placeholder={placeholder}
          name={name}
          value={value}
          required={required}
          {...props}
        />
        <span className="focus-border"></span>
        {isSecret && (
          <span
            className="password_btn"
            onClick={() => setVisible(!visible)}
          ></span>
        )}
      </div>
      {touched && error && <p className="error">{error}</p>}
      {additionErrors && name in additionErrors && (
        <p className="error">{additionErrors[name]}</p>
      )}
    </label>
  );
};
