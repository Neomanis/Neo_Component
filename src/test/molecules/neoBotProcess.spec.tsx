import NeoBotProcess from "../../components/molecules/chat/neoBotProcess";
import { mount } from "@cypress/react";

describe("NeoBotProcess", () => {
    it("should render message props properly", () => {
        mount(<NeoBotProcess message="Processing" showEllipsis={false} />);
        cy.get('[data-testid="process-message"]').should("have.text", "Processing");
    });

    it("should render message and ellipsis props properly", () => {
        mount(<NeoBotProcess message="Processing" showEllipsis={true} />);
        cy.get('[data-testid="process-message"]').should("have.text", "Processing...");
    });

    it("should render ellipsis props properly", () => {
        mount(<NeoBotProcess message="Processing" showEllipsis={true} />);
        cy.get('[data-testid="process-ellipsis"]').should("exist").and("have.text", "...");
        cy.get('[data-testid="process-ellipsis"]').find("div:first-child").should("have.class", "animate-show");
        cy.get('[data-testid="process-ellipsis"]')
            .find("div:nth-child(2)")
            .should("have.class", "animate-show")
            .and("have.css", "animation-delay", "0.3s");
        cy.get('[data-testid="process-ellipsis"]')
            .find("div:last-child")
            .should("have.class", "animate-show")
            .and("have.css", "animation-delay", "0.6s");
    });

    it("should render className props properly", () => {
        mount(<NeoBotProcess message="Processing" showEllipsis={true} className="bg-opacity-75" />);
        cy.get('[data-testid="process-body"]').should("have.class", "bg-opacity-75");
    });

    it("should render cogs and their animation properly", () => {
        mount(<NeoBotProcess message="Processing" showEllipsis={true} />);
        cy.get('[data-testid="process-cogs"]')
            .find("div:first-child")
            .should("exist")
            .and("have.class", "animate-spinBack");
        cy.get('[data-testid="process-cogs"]')
            .find("div:last-child")
            .should("exist")
            .and("have.class", "animate-spinSlow");
    });

    it("should render neoBot logo properly", () => {
        mount(<NeoBotProcess message="Processing" showEllipsis={true} />);
        cy.get('[data-testid="process-logo"]').find("svg:first-child").should("exist");
    });
});
