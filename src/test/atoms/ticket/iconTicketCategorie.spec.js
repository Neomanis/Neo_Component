/* eslint-disable no-undef */

import React from "react";
import { IconTicketCategorie } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("IconTicketCategorie", () => {
    it("should be visible", () => {
        mount(<IconTicketCategorie id={1} />);

        cy.get('[data-testid="iconTicketCategorie-1-body"]').should("be.visible");
    });
    it("should be visible", () => {
        mount(<IconTicketCategorie id={2} />);

        cy.get('[data-testid="iconTicketCategorie-2-body"]').should("be.visible");
    });
    it("should be visible", () => {
        mount(<IconTicketCategorie id={3} />);

        cy.get('[data-testid="iconTicketCategorie-3-body"]').should("be.visible");
    });
    it("should be visible", () => {
        mount(<IconTicketCategorie id={4} />);

        cy.get('[data-testid="iconTicketCategorie-4-body"]').should("be.visible");
    });
    it("should be visible", () => {
        mount(<IconTicketCategorie id={5} />);

        cy.get('[data-testid="iconTicketCategorie-5-body"]').should("be.visible");
    });
    it("should be visible", () => {
        mount(<IconTicketCategorie id={6} />);

        cy.get('[data-testid="iconTicketCategorie-6-body"]').should("be.visible");
    });
    it("should be visible", () => {
        mount(<IconTicketCategorie id={7} />);

        cy.get('[data-testid="iconTicketCategorie-7-body"]').should("be.visible");
    });
    it("should be visible", () => {
        mount(<IconTicketCategorie id={0} />);

        cy.get('[data-testid="iconTicketCategorie-default-body"]').should("be.visible");
    });
});
