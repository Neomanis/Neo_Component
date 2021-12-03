/* eslint-disable no-undef */

import React from "react";
import { Tab } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("Tab", () => {
    it("should be visible and display correctly", () => {
        mount(<Tab children={<p className="text-neo-bg-A">World</p>} />);
        cy.get('[data-testid="tab-body"]').should("be.visible").should("contain.text", "World");
    });
});
