import { Tab } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("Tab", () => {
    it("should be visible and display correctly", () => {
        mount(<Tab title="Hello" children={<p className="text-neo-bg-A">World</p>} />);
        cy.get('[data-testid="tab-body"]').should("be.visible").should("contain.text", "World");
    });
});
