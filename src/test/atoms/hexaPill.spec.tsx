import { HexaPill } from "../../components/atoms";
import { mount } from "@cypress/react";

describe("HexaPill", () => {
    it("should be visible and display correctly", () => {
        mount(<HexaPill color="" ticketUid="1gl-5462-INC" />);
        cy.get('[data-testid="hexaPill-body"]').should("exist").should("be.visible");
    });
});
