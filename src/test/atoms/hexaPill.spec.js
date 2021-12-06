/* eslint-disable no-undef */

import React from "react";
import { HexaPill } from "../../components/atoms";
import { mount } from "@cypress/react";
import "../../styles/tailwind.css";

describe("HexaPill", () => {
    it("should be visible and display correctly", () => {
        mount(<HexaPill />);
        cy.get('[data-testid="hexaPill-body"]').should("be.visible");
    });
});
