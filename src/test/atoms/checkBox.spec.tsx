import { Checkbox } from "../../components/atoms";
import { mount } from "@cypress/react";

describe("Checkbox", () => {
    it("should be visible and display correctly", () => {
        mount(<Checkbox testId="checkBox-body" />);

        cy.get('[data-testid="checkBox-body"]').should("exist");
        cy.get('[data-testid="checkBox-body"]').should("be.visible");
    });

    it("send correctly the callback function", () => {
        const fCallBack = cy.stub().as("send-information");

        mount(<Checkbox testId="checkBox-body" fCallBack={fCallBack} />);

        cy.get('[data-testid="checkBox-body"]').click();
        cy.get("@send-information").should("have.been.called");
    });

    it("should get correct attribut if props exist", () => {
        mount(<Checkbox testId="checkBox-body" name="checkcheck" checked={true} />);

        cy.get('[data-testid="checkBox-body"]').should("have.attr", "name").and("eq", "checkcheck");
        cy.get('[data-testid="checkBox-body"]').should("have.attr", "id").and("eq", "checkcheck");
        cy.get('[data-testid="checkBox-body"]').should("be.checked");
    });

    it("should display label if data prop exist", () => {
        mount(<Checkbox testId="checkBox-body" data="Le Label" />);

        cy.get('[data-testid="checkBox-label"]').should("have.text", "Le Label");
    });

    it("should display CSS correctly if props className exist", () => {
        mount(
            <Checkbox
                testId="checkBox-body"
                data="Le Label"
                classNameLabel="text-neo-yellow-sand"
                classNameInput="bg-neo-light-grey"
            />
        );

        cy.get('[data-testid="checkBox-label"]').should("have.css", "color").and("eq", "rgb(226, 220, 143)");
        cy.get('[data-testid="checkBox-body"]').should("have.css", "background-color").and("eq", "rgb(218, 229, 229)");
    });
});
