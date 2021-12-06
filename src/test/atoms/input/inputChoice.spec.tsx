import { InputChoice } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("InputChoice", () => {
    it("should be visible", () => {
        mount(<InputChoice data={[{ label: "Hello", value: "World" }]} />);

        cy.get('[data-testid="inputChoice-body"]').should("be.visible");
    });
});
