import { BubbleChat } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("BubbleChat", () => {
    it("should be visible and display content props value", () => {
        mount(<BubbleChat content="Helloworld" />);

        cy.get('[data-testid="bubbleChat-body"]').should("be.visible").should("contain.text", "Helloworld");
    });

    it("should have background as bgColor props value", () => {
        mount(<BubbleChat content="Helloworld" bgColor="bg-neo-bg-A" />);

        cy.get('[data-testid="bubbleChat-body"]').should("have.class", "bg-neo-bg-A");
    });

    it("should not have background if bgColor props is not define", () => {
        mount(<BubbleChat content="Helloworld" />);

        cy.get('[data-testid="bubbleChat-body"]').should("not.have.class", "bg-neo-bg-A");
    });

    it("should show bubble chat border if border is define", () => {
        mount(<BubbleChat content="Helloworld" border="border-neo-bg-B" />);

        cy.get('[data-testid="bubbleChat-body"]').should("have.class", "border-neo-bg-B border-2");
    });

    it("should not show bubble chat border if border is not define", () => {
        mount(<BubbleChat content="Helloworld" />);

        cy.get('[data-testid="bubbleChat-body"]').should("not.have.class", "bottom-6");
    });
});
