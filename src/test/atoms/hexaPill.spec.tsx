import { HexaPill } from "../../components/atoms";
import { mount } from "@cypress/react";

describe("HexaPill", () => {
    it("should be visible and display correctly", () => {
        mount(<HexaPill color="" ticketNumber={1} />);
        cy.get('[data-testid="hexaPill-body"]').should("be.visible");
    });
});
