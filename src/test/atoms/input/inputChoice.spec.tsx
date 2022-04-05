import { InputChoice } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("InputChoice", () => {
    it("should be visible", () => {
        mount(<InputChoice data={[{ label: "Hello", value: 1 }]} />);

        cy.get('[data-testid="inputChoice-body"]').should("be.visible");
    });
});
