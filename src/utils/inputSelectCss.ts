/* eslint-disable @typescript-eslint/no-unused-vars */

import { StylesConfig } from "react-select";

export const baseStyles: StylesConfig = {
    container: (provided, state) => ({
        ...provided,
        background: "#0E3864",
        color: "#DAE5E5",
    }),
    control: (provided, state) => ({
        ...provided,
        width: "100%",
        color: "#DAE5E5",
        background: "#0E3864",
        border: "none",
        height: "100%",
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: "100%",
        paddingTop: "5px",
        paddingBottom: "5px",
        overflow: "scroll",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        paddingLeft: 0,
        paddingRight: 5,
        border: "none",
    }),
    clearIndicator: (provided, state) => ({
        ...provided,
        paddingLeft: 0,
        paddingRight: 0,
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
        background: "#0E3864",
    }),
    multiValue: (provided, state) => ({
        ...provided,
        color: "#DAE5E5",
        background: "#FF1166",
        margin: "3px 2px 3px 2px",
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        background: "#152535",
        color: "#DAE5E5",
    }),
    noOptionsMessage: (provided, state) => ({
        ...provided,
        background: "#0E3864",
        borderRadius: 10,
        margin: 0,
    }),
    option: (provided, state: { isSelected: boolean }) => ({
        ...provided,
        "&:hover": {
            background: "#366688",
            cursor: "pointer",
        },
        background: "#0E3864",
        color: state.isSelected ? "#FF1166" : "#DAE5E5",
        padding: 10,
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: "#DAE5E5",
    }),
    group: (provided, state) => ({
        ...provided,
        padding: 0,
    }),
};
