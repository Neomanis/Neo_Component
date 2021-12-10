import { TextEditor } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("TextEditor", () => {
    it("should be visible", () => {
        mount(<TextEditor refForm="input" required={false} className="w-full" />);

        cy.get('[data-testid="textEditor-body"]').should("be.visible");
    });
});
