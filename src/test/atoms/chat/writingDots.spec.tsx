import WritingDots from "../../../components/atoms/chat/writingDots";
import { mount } from "@cypress/react";

describe("WritingDots", () => {
    it("should display className props properly", () => {
        mount(<WritingDots className="bg-neo-expanded" />);

        cy.get('[data-testid="writingDots-body"]').should("have.class", "bg-neo-expanded");
    });

    it("should display dotClassName props properly", () => {
        mount(<WritingDots className="bg-neo-expanded" dotClassName="test" />);

        cy.get('[data-testid="writingDots-body"]').find("div:first-child").should("have.class", "test");
        cy.get('[data-testid="writingDots-body"]').find("div:nth-child(2)").should("have.class", "test");
        cy.get('[data-testid="writingDots-body"]').find("div:last-child").should("have.class", "test");
    });

    it("should display animation props properly", () => {
        mount(<WritingDots className="bg-neo-expanded" animation="animate-pulseDots" />);

        cy.get('[data-testid="writingDots-body"]').find("div:first-child").should("have.class", "animate-pulseDots");
        cy.get('[data-testid="writingDots-body"]').find("div:nth-child(2)").should("have.class", "animate-pulseDots");
        cy.get('[data-testid="writingDots-body"]').find("div:last-child").should("have.class", "animate-pulseDots");
    });

    it("should create correct delay between dots", () => {
        mount(<WritingDots delay={250} />);

        cy.get('[data-testid="writingDots-body"]').find("div:nth-child(2)").should("have.class", "animation-delay-250");
        cy.get('[data-testid="writingDots-body"]').find("div:last-child").should("have.class", "animation-delay-500");
    });
});
