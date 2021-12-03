/* eslint-disable no-undef */

import React from "react";
import { Tabs } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("Tab", () => {
    it("should be visible and display correctly", () => {
        mount(<Tabs />);
    });
});
