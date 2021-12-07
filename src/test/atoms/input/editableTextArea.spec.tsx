import { EditableTextarea } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("EditableTextarea", () => {
    it("should be visible", () => {
        mount(<EditableTextarea refForm="content" />);

        cy.get('[data-testid="editableTextArea-body"]').should("be.visible");
    });
});
