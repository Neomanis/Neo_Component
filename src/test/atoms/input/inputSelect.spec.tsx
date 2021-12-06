import { InputSelect } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("InputSelect", () => {
    it("should be visible", () => {
        mount(<InputSelect data={[]} refForm="select" />);

        cy.get('[data-testid="inputSelect-body"]').should("be.visible");
    });
});
