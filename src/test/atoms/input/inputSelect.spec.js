/* eslint-disable no-undef */

import React from "react";
import { InputSelect } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("InputSelect", () => {
    it("should be visible", () => {
        mount(<InputSelect />);

        cy.get('[data-testid="inputSelect-body"]').should("be.visible");
    });
});
