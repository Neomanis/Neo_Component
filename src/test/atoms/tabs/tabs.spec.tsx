import React from "react";
import { Tab, Tabs } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("Tabs", () => {
    it("should be visible and display correctly", () => {
        mount(
            <Tabs>
                <Tab title="Hello">Hello World</Tab>
                <Tab title="World">Hello World</Tab>
            </Tabs>
        );
        cy.get('[data-testid="tabs-body"]').should("be.visible");
        cy.get('[data-testid="tabTitle-body"]').should("be.visible");
    });
});
