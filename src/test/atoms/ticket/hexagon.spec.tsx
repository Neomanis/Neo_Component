/* eslint-disable no-undef */

import React from "react";
import { Hexagon } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("Hexagon", () => {
    it("should be visible with ticket type", () => {
        mount(<Hexagon type="ticket" />);

        cy.get('[data-testid="hexagonTicket-svg"]').should("be.visible");
    });
    it("should be visible with filter type", () => {
        mount(<Hexagon type="filter" />);

        cy.get('[data-testid="hexagonFilter-svg"]').should("be.visible");
    });
    it("should be visible with rotate type", () => {
        mount(<Hexagon type="rotate" />);

        cy.get('[data-testid="hexagonRotate-svg"]').should("be.visible");
    });
    it("should be visible with left half  type", () => {
        mount(<Hexagon type="leftHalf" />);

        cy.get('[data-testid="hexagonLeftHalf-svg"]').should("be.visible");
    });
    it("should be visible with right half type", () => {
        mount(<Hexagon type="rightHalf" />);

        cy.get('[data-testid="hexagonRightHalf-svg"]').should("be.visible");
    });
    it("should be visible with default type", () => {
        mount(<Hexagon type="default" />);

        cy.get('[data-testid="hexagonDefault-svg"]').should("be.visible");
    });
});
