import { InputSimpleSelect } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("InputSimpleSelect", () => {
    it("should be visible", () => {
        mount(<InputSimpleSelect data={[]} />);

        cy.get('[data-testid="inputSimpleSelect-body"]').should("be.visible");
    });
});
