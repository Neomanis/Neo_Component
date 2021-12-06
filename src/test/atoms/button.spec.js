/* eslint-disable no-undef */

import React from "react";
import { Button } from "../../components/atoms";
import { mount } from "@cypress/react";
import "../../styles/tailwind.css";

describe("Button", () => {
    it("should be visible and display correctly", () => {
        mount(<Button testId="button-body" type="default" data="Helloworld" />);
        cy.get('[data-testid="button-body"]').should("be.visible");
    });
});
