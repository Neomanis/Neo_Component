/* eslint-disable no-undef */

import React from "react";
import { InputDateShift } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("InputDateShift", () => {
    it("should be visible", () => {
        mount(<InputDateShift date={new Date()} />);

        cy.get('[data-testid="inputDateShift-body"]').should("be.visible");
    });
});
