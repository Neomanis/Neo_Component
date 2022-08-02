import React, { ReactElement } from "react";
import { Tab, Tabs } from "../../../components/atoms";
import { mount } from "@cypress/react";

const children: ReactElement[] = [<Tab title="Hello">Hello</Tab>, <Tab title="World">World</Tab>];

describe("Tabs", () => {
    it("should be visible and display correctly", () => {
        mount(<Tabs children={children} />);
        cy.get('[data-testid="tabs-body"]').should("be.visible");
        cy.get('[data-testid="tabTitle-body-0"]').should("be.visible");
        cy.get('[data-testid="tabTitle-body-1"]').should("be.visible");
    });

    it("should display correct chidren when click on TabTitle", () => {
        mount(<Tabs children={children} />);
        cy.get('[data-testid="tabTitle-body-1"]').should("have.css", "color").and("eq", "rgb(125, 170, 183)");
        cy.get('[data-testid="tabTitle-body-1"]').click();
        cy.get('[data-testid="tabTitle-body-1"]').should("have.css", "color").and("eq", "rgb(34, 170, 255)");
    });
});
