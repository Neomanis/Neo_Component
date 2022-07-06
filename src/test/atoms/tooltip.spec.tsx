import { Tooltip } from "../../components/atoms";
import { mount } from "@cypress/react";
import { faUser } from "@fortawesome/free-solid-svg-icons";

describe("Tooltip", () => {
    it("should show data on hover", () => {
        mount(
            <Tooltip position="top" text="El data">
                <p>Hey oh</p>
            </Tooltip>
        );
        cy.get('[data-testid="tooltip-bubble"]').should("have.class", "hidden");
        cy.get('[data-testid="tooltip-body"]').trigger("mouseover");
        cy.get('[data-testid="tooltip-bubble"]').should("not.have.class", "hidden");
        cy.get('[data-testid="tooltip-body"]').trigger("mouseout");
        cy.get('[data-testid="tooltip-bubble"]').should("have.class", "hidden");
    });

    it("should show tooltip bubble at the top", () => {
        mount(<Tooltip text="El data" position="top" />);
        cy.get('[data-testid="tooltip-bubble"]').should("have.class", "bottom-6");
    });

    it("should show tooltip bubble at the bottom", () => {
        mount(<Tooltip text="El data" position="bottom" />);
        cy.get('[data-testid="tooltip-bubble"]').should("have.class", "top-6");
    });

    it("should show a icon", () => {
        mount(<Tooltip position="top" text="El data" fontIcon={faUser} />);
        cy.get("svg").should("exist");
    });

    it("should have a children component", () => {
        mount(
            <Tooltip position="top" text="El data">
                <p>El componente</p>
            </Tooltip>
        );
        cy.get("p").should("exist");
    });
});
