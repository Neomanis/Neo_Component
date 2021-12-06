import { Button } from "../../components/atoms";
import { mount } from "@cypress/react";

describe("Button", () => {
    it("should be visible and display correctly", () => {
        mount(<Button testId="button-body" data="Helloworld" />);
        cy.get('[data-testid="button-body"]').should("be.visible");
    });
});
