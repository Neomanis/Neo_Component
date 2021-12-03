/* eslint-disable no-undef */

import React from "react";
import { Tooltip } from "../../components/atoms";
import { mount } from "@cypress/react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../../styles/tailwind.css";
describe("Tooltip", () => {
    it("should show data on hover", () => {
        mount(<Tooltip data="El data" component={<p>Hey oh</p>} />);

        cy.get('[data-testid="tooltip-bubble"]').should("be.hidden").invoke("show").should("be.visible");
    });

    it("should show tooltip bubble at the top", () => {
        mount(<Tooltip data="El data" position="top" />);

        cy.get('[data-testid="tooltip-bubble"]').should("have.class", "bottom-");
    });

    it("should show tooltip bubble at the bottom", () => {
        mount(<Tooltip data="El data" position="top" />);

        cy.get('[data-testid="tooltip-bubble"]').should("have.class", "bottom-6");
    });

    it("should show a icon", () => {
        mount(<Tooltip data="El data" fontIcon={faUser} />);
        cy.get("svg").should("exist");
    });

    it("should have a children component", () => {
        mount(<Tooltip data="El data" component={<p>El componente</p>} />);
        cy.get("p").should("exist");
    });

    it("should call the callback function when clicking the icon", () => {
        const fCallback = cy.stub().as("el-callback");

        mount(<Tooltip data="El data" fontIcon={faUser} fCallback={fCallback} />);
        cy.get('[data-testid="tooltip-icon-body"]').click();

        cy.get("@el-callback").should("have.been.called");
    });
});
