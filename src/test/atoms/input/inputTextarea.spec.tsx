import { InputTextarea } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("InputTextarea", () => {
    it("should be visible", () => {
        mount(<InputTextarea refForm="text" classNames={{ container: "h-20 w-20" }} />);

        cy.get('[data-testid="inputTextarea-body"]').should("be.visible");
    });
});
