import { Hexagon } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("Hexagon", () => {
    it("should be visible with ticket type", () => {
        mount(<Hexagon type="ticket" />);

        cy.get('[data-testid="hexagonTicket-svg"]').should("be.visible");
    });
    it("should be visible with default type", () => {
        mount(<Hexagon type="default" />);

        cy.get('[data-testid="hexagonDefault-svg"]').should("be.visible");
    });
});
