import { InputDateTime } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("InputDateTime", () => {
    it("should be visible", () => {
        mount(<InputDateTime defaultValue={new Date()} refForm="date" />);

        cy.get('[data-testid="inputDateTime-body"]').should("be.visible");
    });
});
