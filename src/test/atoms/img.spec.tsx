/* eslint-disable no-undef */

import React from "react";
import { Img } from "../../components/atoms";
import { mount } from "@cypress/react";
import "../../styles/tailwind.css";

describe("Img", () => {
    it("should be visible and display correctly with type logoImg", () => {
        mount(<Img type="logoImg" data={{ alt: "Helloworld", height: 200 }} />);
        cy.get('[data-testid="logoImg-body"]').should("be.visible");
    });
    it("should be visible and display correctly with type logoSvg", () => {
        mount(<Img type="logoSvg" data={{ alt: "Helloworld", height: 200 }} />);
        cy.get('[data-testid="logoSvg-body"]').should("be.visible");
    });
    it("should be visible and display correctly with type imgProfile with data", () => {
        mount(<Img type="imgProfile" data={{ alt: "Helloworld", height: 200 }} />);
        cy.get('[data-testid="profileImg-with-data-body"]').should("be.visible");
    });
    it("should be visible and display correctly with type imgProfile without data", () => {
        mount(<Img type="imgProfile" />);
        cy.get('[data-testid="profileImg-without-data-body"]').should("be.visible");
    });
    it("should be visible and display correctly with type img-background", () => {
        mount(<Img type="img-background" data={{ alt: "Helloworld", height: 200 }} />);
        cy.get('[data-testid="backgroundImg-body"]').should("be.visible");
    });
    it("should be visible and display correctly with type default", () => {
        mount(<Img type="" data={{ alt: "Helloworld", height: 200 }} />);
        cy.get('[data-testid="default-body"]').should("be.visible");
    });
});
