/* eslint-disable no-undef */

import React from "react";
import { InputDateTime } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("InputDateTime", () => {
    it("should be visible", () => {
        mount(<InputDateTime />);

        cy.get('[data-testid="inputDateTime-body"]').should("be.visible");
    });
});
