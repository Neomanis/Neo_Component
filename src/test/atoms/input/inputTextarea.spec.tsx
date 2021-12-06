/* eslint-disable no-undef */

import React from "react";
import { InputTextarea } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("InputTextarea", () => {
    it("should be visible", () => {
        mount(<InputTextarea refForm="text" />);

        cy.get('[data-testid="inputTextarea-body"]').should("be.visible");
    });
});
