import { SwitchToggle } from "../../components/atoms";
import { mount } from "@cypress/react";

describe("SwitchToggle", () => {
    it("should be visible ", () => {
        mount(<SwitchToggle value="Helloworld" defaultStatus={false} />);

        cy.get('[data-testid="switchToggle-body"]').should("be.visible");
    });
});
