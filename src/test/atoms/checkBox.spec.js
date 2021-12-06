/* eslint-disable no-undef */

import React from "react";
import { Checkbox } from "../../components/atoms";
import { mount } from "@cypress/react";
import "../../styles/tailwind.css";

describe("Checkbox", () => {
    it("should be visible and display correctly", () => {
        mount(<Checkbox testId="checkBox-body" />);
        cy.get('[data-testid="checkBox-body"]').should("be.visible");
    });
});
