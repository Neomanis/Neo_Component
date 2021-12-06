/* eslint-disable no-undef */

import React from "react";
import { Title } from "../../components/atoms";
import { mount } from "@cypress/react";
import "../../styles/tailwind.css";

describe("Title", () => {
    it("should be visible with type h1", () => {
        mount(<Title type="h1" data="Helloworld" />);

        cy.get('[data-testid="title-h1-body"]').should("be.visible");
    });
    it("should be visible with type h2", () => {
        mount(<Title type="h2" data="Helloworld" />);

        cy.get('[data-testid="title-h2-body"]').should("be.visible");
    });
    it("should be visible with type h3", () => {
        mount(<Title type="h3" data="Helloworld" />);

        cy.get('[data-testid="title-h3-body"]').should("be.visible");
    });
    it("should be visible with type h4", () => {
        mount(<Title type="h4" data="Helloworld" />);

        cy.get('[data-testid="title-h4-body"]').should("be.visible");
    });
    it("should be visible with type default", () => {
        mount(<Title data="Helloworld" />);

        cy.get('[data-testid="title-default-body"]').should("be.visible");
    });
});
