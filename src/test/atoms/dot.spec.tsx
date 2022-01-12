import { Dot } from "../../components/atoms";
import { mount } from "@cypress/react";

describe("Dot", () => {
    it("should be visible and display correctly", () => {
        mount(
            <Dot
                isSuccess={true}
                onClickCallback={() => {
                    // eslint-disable-next-line no-console
                    console.log("empty");
                }}
            />
        );
        cy.get('[data-testid="dot-body"]').should("be.visible");
    });
});
