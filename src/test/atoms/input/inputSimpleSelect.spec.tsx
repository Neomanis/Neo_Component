/* eslint-disable no-undef */

import React from "react";
import { InputSimpleSelect } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("InputSimpleSelect", () => {
    it("should be visible", () => {
        mount(<InputSimpleSelect data={[]} />);

        cy.get('[data-testid="inputSimpleSelect-body"]').should("be.visible");
    });
});
