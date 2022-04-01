import { Status } from "../../enumeration";
import { getTicketLogoByStatus } from "../../components/utils/ticketLogoByStatus";
import { mount } from "@cypress/react";

describe("getTicketLogoByStatus", () => {
    it("should return a ticketLogo normal based on ticket's status", () => {
        const TicketNormal = getTicketLogoByStatus(Status.New, "#000000");
        mount(TicketNormal);
        cy.get('[data-testid="ico-ticket-normal"]').should("exist").and("have.attr", "fill", "#000000");
    });
    it("should return a ticketLogo solved based on ticket's status", () => {
        const TicketSolved = getTicketLogoByStatus(Status.Solved, "#000000");
        mount(TicketSolved);
        cy.get('[data-testid="ico-ticket-solved"]').should("exist").and("have.attr", "fill", "#000000");
    });
    it("should return a ticketLogo closed based on ticket's status", () => {
        const TicketClosed = getTicketLogoByStatus(Status.Closed, "#000000");
        mount(TicketClosed);
        cy.get('[data-testid="ico-ticket-closed"]').should("exist").and("have.attr", "fill", "#000000");
    });
});
