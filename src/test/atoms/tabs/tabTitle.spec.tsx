import { TabTitle } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("TabTitle", () => {
    it("should be visible and display correctly", () => {
        const fCallback = cy.stub().as("tabTile-callback");
        mount(<TabTitle handleSelectedTab={fCallback} index={0} selectedTab={1} title="Hello" />);
        cy.get('[data-testid="tabTitle-body-0"]').should("be.visible");
    });
    it("should be have interactive button", () => {
        const fCallback = cy.stub().as("tabTile-callback");
        mount(<TabTitle handleSelectedTab={fCallback} index={0} selectedTab={1} title="Hello" />);
        cy.get('[data-testid="tabTitle-button"]').should("be.visible").should("contain.text", "Hello");
        cy.get('[data-testid="tabTitle-button"]').click();
        cy.get("@tabTile-callback").should("have.been.called");
    });
    it("should display correct css if selectedtab and index props values are different", () => {
        const fCallback = cy.stub().as("tabTile-callback");
        mount(<TabTitle handleSelectedTab={fCallback} index={0} selectedTab={1} title="Hello" />);
        cy.get('[data-testid="tabTitle-body-0"]').should(
            "have.class",
            "hover:text-white border-opacity-0 text-neo-link"
        );
    });
    it("should display correct css if selectedtab and index props values are equal", () => {
        const fCallback = cy.stub().as("tabTile-callback");
        mount(<TabTitle handleSelectedTab={fCallback} index={1} selectedTab={1} title="Hello" />);
        cy.get('[data-testid="tabTitle-body-1"]').should("have.class", "text-neo-blue border-neo-blue");
    });
});
