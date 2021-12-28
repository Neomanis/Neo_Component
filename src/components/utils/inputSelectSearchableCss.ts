/* eslint-disable @typescript-eslint/no-unused-vars */

export const customStyles = {
    clearIndicator: (provided, state) => ({
        ...provided,
        display: "bloc",
        padding: 0,
        position: "absolute",
        right: 30,
        top: 10,
        border: "none",
    }),
    container: (provided, state) => ({
        ...provided,
        background: "#15304C",
        padding: 0,
        margin: 0,
        color: "#DAE5E5",
    }),
    control: (provided, state) => ({
        ...provided,
        width: "100%",
        color: "#DAE5E5",
        background: "#15304C",
        border: "none",
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        display: "bloc",
        padding: 0,
        position: "absolute",
        right: 5,
        top: 10,
        border: "none",
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        display: "none",
    }),
    input: (provided, state) => ({
        ...provided,
        color: "#DAE5E5",
        margin: 0,
    }),
    menu: (provided, state) => ({
        ...provided,
        background: "#15304C",
    }),
    multiValue: (provided, state) => ({
        ...provided,
        color: "#DAE5E5",
        background: "#FF1166",
        margin: 1,
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        background: "#152535",
        color: "#DAE5E5",
    }),
    noOptionsMessage: (provided, state) => ({
        ...provided,
        background: "#15304C",
        borderRadius: 10,
        margin: 0,
    }),
    option: (provided, state: { isSelected }) => ({
        ...provided,
        "&:hover": {
            background: "#366688",
            cursor: "pointer",
        },
        background: "#15304C",
        color: state.isSelected ? "#FF1166" : "#DAE5E5",
        padding: 10,
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: "#DAE5E5",
    }),
};
