import { InputFile } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("InputFile", () => {
    it("should be visible", () => {
        mount(<InputFile name="input-file" />);

        cy.get('[data-testid="inputFile-body"]').should("be.visible");
    });
});
