import { IconOutageCategorie } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("IconOutageCategorie", () => {
    it("should be visible and display correct component corresponding to id 1", () => {
        mount(<IconOutageCategorie id={1} />);
        cy.get('[data-testid="iconOutageCategorie-id-1"]').should("be.visible");
        cy.get("svg").should("exist");
    });
    it("should be visible and display correct component corresponding to id 2", () => {
        mount(<IconOutageCategorie id={2} />);
        cy.get('[data-testid="iconOutageCategorie-id-2"]').should("be.visible");
        cy.get("svg").should("exist");
    });
    it("should be visible and display correct component corresponding to default", () => {
        mount(<IconOutageCategorie id={3} />);
        cy.get('[data-testid="iconOutageCategorie-default"]').should("be.visible");
        cy.get("svg").should("exist");
    });
    it("should have corresponding className if props className is defined", () => {
        mount(<IconOutageCategorie id={99} className="bg-neo-bg-A" />);
        cy.get('[data-testid="iconOutageCategorie-default"]').should("have.class", "bg-neo-bg-A");
    });
});
