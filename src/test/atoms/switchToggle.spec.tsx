import { SwitchToggle } from "../../components/atoms";
import { mount } from "@cypress/react";

describe("SwitchToggle", () => {
    it("should be visible without value", () => {
        mount(<SwitchToggle defaultStatus={false} />);

        cy.get('[data-testid="switchToggle-body"]').should("be.visible").and("exist");
        cy.get('[data-testid="switchToggle-label"]').should("not.exist");
    });

    it("should be visible without value", () => {
        const fCallBack = cy.stub().as("callback");

        mount(<SwitchToggle fCallBack={fCallBack} value="Helloworld" defaultStatus={false} />);

        cy.get('[data-testid="switchToggle-pill"]').click();
        cy.get("@callback").should("have.been.called");
    });

    it("should be check ", () => {
        mount(<SwitchToggle value="Helloworld" defaultStatus={false} />);
        cy.get('[data-testid="switchToggle-pill"]').click();
        cy.get('[type="checkbox"]').should("be.checked");
        cy.get('[data-testid="switchToggle-body"]').should("be.visible");
    });

    it("should have new CSS if colors props exist ", () => {
        mount(
            <SwitchToggle
                value="Helloworld"
                defaultStatus={false}
                checkBgColor="neo-blue"
                checkPillColor="neo-red"
                uncheckBgColor="neo-green"
                uncheckPillColor="neo-blue"
                labelClassName="text-neo-green"
            />
        );
        cy.get('[data-testid="switchToggle-pill"]')
            .should("have.css", "background-color")
            .and("eq", "rgb(34, 170, 255)");
        cy.get('[data-testid="switchToggle-bg"]')
            .should("have.css", "background-color")
            .and("eq", "rgb(127, 239, 127)");
        cy.get('[data-testid="switchToggle-label"]').should("have.css", "color").and("eq", "rgb(127, 239, 127)");
        cy.get('[data-testid="switchToggle-pill"]').click();
        cy.get('[data-testid="switchToggle-pill"]')
            .should("have.css", "background-color")
            .and("eq", "rgb(247, 40, 79)");
        cy.get('[data-testid="switchToggle-bg"]').should("have.css", "background-color").and("eq", "rgb(34, 170, 255)");
    });
});
