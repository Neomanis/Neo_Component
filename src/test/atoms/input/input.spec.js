/* eslint-disable no-undef */

import React from "react";
import { Input } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("Input", () => {
    it("should be visible", () => {
        mount(<Input />);

        cy.get('[data-testid="input-body"]').should("be.visible");
    });
});
