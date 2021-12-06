/* eslint-disable no-undef */

import React from "react";
import { InputMultipleSelect } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("InputMultipleSelect", () => {
    it("should be visible", () => {
        mount(<InputMultipleSelect activeItems={[{ id: 1, value: "Hello" }]} />);

        cy.get('[data-testid="inputMultipleSelect-body"]').should("be.visible");
    });
});
