/* eslint-disable no-undef */

import React from "react";
import { InputChoice } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("InputChoice", () => {
    it("should be visible", () => {
        mount(<InputChoice data={[{ label: "Hello", value: "World" }]} />);

        cy.get('[data-testid="inputChoice-body"]').should("be.visible");
    });
});
