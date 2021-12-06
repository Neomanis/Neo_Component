import { InputMultipleSelect } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("InputMultipleSelect", () => {
    it("should be visible", () => {
        mount(<InputMultipleSelect activeItems={[{ id: 1, value: "Hello" }]} refForm="select" items={[]} />);

        cy.get('[data-testid="inputMultipleSelect-body"]').should("be.visible");
    });
});
