/* eslint-disable no-undef */

import React from "react";
import { Tabs, TabTitle } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("Tabs", () => {
    it("should be visible and display correctly", () => {
        mount(<Tabs children={[<TabTitle title="Bye">Hello</TabTitle>, <TabTitle title="Re">Again</TabTitle>]} />);
        cy.get('[data-testid="tabs-body"]').should("be.visible");
        cy.get('[data-testid="tabTitle-body"]').should("be.visible");
    });
});
