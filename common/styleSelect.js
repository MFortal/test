export const styleSelect = {
  control: (base) => ({
    ...base,
    border: "1px solid #F1F8FF",
    boxShadow: "none",
    background: "#F1F8FF",
    padding: "0 8px",
    height: "40px",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "22px",
    color: "#6D6D6C",

    "&:hover": {
      borderColor: "#F1F8FF",
      cursor: "pointer",
      boxShadow: "none",
    },
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "rgba(224, 224, 224, 0.2)" : undefined,
    zIndex: 1,
    color: isSelected ? "#fff" : undefined,
    background: isSelected ? "hsl(208, 100%, 47%)" : undefined,
    "&:hover": {
      color: isSelected ? "#fff" : undefined,
      background: "trensparent",
      cursor: "pointer",
    },
  }),

  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    width: "0px",
    height: "0px",
    borderWidth: "0.6ex 0.6ex 0px",
    borderColor: "rgba(0, 0, 0, 0.7) transparent transparent",
    borderStyle: "solid",
    margin: "-0.3ex 0px 0px -0.56ex",
    top: "24px",
    right: "17px",
    position: "relative",
    padding: "0",
    top: 0,
  }),

  singleValue: (base) => ({
    ...base,
    color: "inherit",
  }),
};

export const styleSelect2 = {
  control: (base) => ({
    ...base,
    border: "1px solid #C1C7D0",
    boxShadow: "none",
    background: "#fff",
    padding: "0 8px",
    height: "50px",
    fontWeight: "400",
    fontSize: "17px",
    lineHeight: "22px",
    color: "#6D6D6C",
    marginBottom: "15px",

    "&:hover": {
      cursor: "pointer",
      boxShadow: "none",
    },
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "rgba(224, 224, 224, 0.2)" : undefined,
    zIndex: 1,
    color: isSelected ? "#fff" : undefined,
    background: isSelected ? "hsl(208, 100%, 47%)" : undefined,
    "&:hover": {
      color: isSelected ? "#fff" : undefined,
      background: "trensparent",
      cursor: "pointer",
    },
  }),

  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
  }),

  singleValue: (base) => ({
    ...base,
    color: "inherit",
  }),
};

export const styleSelect3 = {
  control: (base) => ({
    ...base,
    border: "1.3px solid #007EEE",
    boxShadow: "none",
    background: "#fff",
    padding: "0 8px",
    height: "53px",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "22px",
    color: "#6D6D6C",
    marginTop: "12px",

    "&:hover": {
      cursor: "pointer",
      boxShadow: "none",
    },
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "rgba(224, 224, 224, 0.2)" : undefined,
    zIndex: 1,
    color: isSelected ? "#fff" : undefined,
    background: isSelected ? "hsl(208, 100%, 47%)" : undefined,
    "&:hover": {
      color: isSelected ? "#fff" : undefined,
      background: "trensparent",
      cursor: "pointer",
    },
  }),

  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
  }),

  singleValue: (base) => ({
    ...base,
    color: "inherit",
  }),
};

export const styleSelect4 = {
  control: (base) => ({
    ...base,
    border: "1.3px solid #007EEE",
    boxShadow: "none",
    background: "#fff",
    padding: "0 8px",
    height: "40px",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "22px",
    color: "#6D6D6C",

    "&:hover": {
      cursor: "pointer",
      boxShadow: "none",
    },
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "rgba(224, 224, 224, 0.2)" : undefined,
    zIndex: 1,
    color: isSelected ? "#fff" : undefined,
    background: isSelected ? "hsl(208, 100%, 47%)" : undefined,
    "&:hover": {
      color: isSelected ? "#fff" : undefined,
      background: "trensparent",
      cursor: "pointer",
    },
  }),

  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
  }),

  singleValue: (base) => ({
    ...base,
    color: "inherit",
  }),
};

export const styleSelect5 = {
  control: (base) => ({
    ...base,
    border: "1.3px solid #007EEE",
    boxShadow: "none",
    background: "#fff",
    padding: "0 8px",
    height: "40px",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "22px",
    color: "#6D6D6C",

    "&:hover": {
      cursor: "pointer",
      boxShadow: "none",
    },
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "rgba(224, 224, 224, 0.2)" : undefined,
    zIndex: 1,
    color: isSelected ? "#fff" : undefined,
    background: isSelected ? "hsl(208, 100%, 47%)" : undefined,
    "&:hover": {
      color: isSelected ? "#fff" : undefined,
      background: "trensparent",
      cursor: "pointer",
    },
  }),

  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
  }),

  singleValue: (base) => ({
    ...base,
    color: "inherit",
  }),
};

export const styleSelectLot = {
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    background: "#F7F7F7",
    padding: "0 8px",
    height: "50px",
    fontWeight: "400",
    fontSize: "17px",
    lineHeight: "22px",
    color: "#6D6D6C",
    marginBottom: "0",

    "&:hover": {
      cursor: "pointer",
      boxShadow: "none",
    },
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "rgba(224, 224, 224, 0.2)" : undefined,
    zIndex: 1,
    color: isSelected ? "#fff" : undefined,
    background: isSelected ? "hsl(208, 100%, 47%)" : undefined,
    "&:hover": {
      color: isSelected ? "#fff" : undefined,
      background: "trensparent",
      cursor: "pointer",
    },
  }),

  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
  }),

  singleValue: (base) => ({
    ...base,
    color: "inherit",
  }),
};
export const styleSelectAddLot = {
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    background: "#F7F7F7",
    padding: "0 8px",
    height: "50px",
    fontWeight: "400",
    fontSize: "17px",
    lineHeight: "22px",
    color: "#ba998b",
    marginBottom: "0",

    "&:hover": {
      cursor: "pointer",
      boxShadow: "none",
    },
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "rgba(224, 224, 224, 0.2)" : undefined,
    zIndex: 1,
    color: isSelected ? "#fff" : undefined,
    background: isSelected ? "hsl(208, 100%, 47%)" : undefined,
    "&:hover": {
      color: isSelected ? "#fff" : undefined,
      background: "trensparent",
      cursor: "pointer",
    },
  }),

  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
  }),

  singleValue: (base) => ({
    ...base,
    color: "inherit",
  }),
};

export const styleSelectGender = {
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    background: "#F7F7F7",
    padding: "0 8px",
    height: "55px",
    fontWeight: "400",
    fontSize: "17px",
    lineHeight: "24px",
    color: "#1c1c1c",
    marginBottom: "0",
    borderRadius: "7px",

    "&:hover": {
      cursor: "pointer",
      boxShadow: "none",
    },
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "rgba(224, 224, 224, 0.2)" : undefined,
    zIndex: 1,
    fontWeight: "400",
    fontSize: "15px",
    lineHeight: "22px",
    color: isSelected ? "#fff" : undefined,
    background: isSelected ? "hsl(208, 100%, 47%)" : undefined,
    "&:hover": {
      color: isSelected ? "#fff" : undefined,
      background: "trensparent",
      cursor: "pointer",
    },
  }),

  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
  }),

  singleValue: (base) => ({
    ...base,
    color: "inherit",
  }),
};

export const styleSelectNumber = {
  control: (base) => ({
    ...base,
    border: "none",
    cursor: "pointer",
    boxShadow: "none",
    background: "#fff",
    padding: "0 5px",
    height: "auto",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "22px",
    color: "#1C1C1C",
    width: "fit-content",

    "&:hover": {
      cursor: "pointer",
      boxShadow: "none",
    },
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "rgba(224, 224, 224, 0.2)" : undefined,
    zIndex: 1,
    color: isSelected ? "#fff" : undefined,
    background: isSelected ? "hsl(208, 100%, 47%)" : undefined,
    "&:hover": {
      color: isSelected ? "#fff" : undefined,
      background: "trensparent",
      cursor: "pointer",
    },
  }),

  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    width: "0px",
    height: "0px",
    borderWidth: "0.6ex 0.6ex 0px",
    borderColor: "rgba(0, 0, 0, 0.7) transparent transparent",
    borderStyle: "solid",
    margin: "-0.3ex 0px 0px -0.56ex",
    top: "24px",
    right: "17px",
    position: "relative",
    padding: "0",
    top: "3px",
    right: "1px",
  }),
};
