import { Icon } from "../../components/atoms";
import { mount } from "@cypress/react";

import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

describe("Icon", () => {
    it("should be visible and display icon link type", () => {
        mount(<Icon type="iconLink" fontIcon={faCheckSquare} />);
        cy.get('[data-testid="icon-link-body"]').should("be.visible");
    });
    it("should be visible and display icon placeholder type", () => {
        mount(<Icon type="placeholderInput" fontIcon={faCheckSquare} className="p-4 text-neo-bg-B text-4xl" />);
        cy.get('[data-testid="icon-placeholder-body"]').should("be.visible");
    });
    it("should be visible and display icon red dot type", () => {
        mount(<Icon type="iconWithRedDot" fontIcon={faCheckSquare} />);
        cy.get('[data-testid="icon-reddot-body"]').should("be.visible");
    });
    it("should be visible and display icon default type", () => {
        mount(<Icon fontIcon={faCheckSquare} />);
        cy.get('[data-testid="icon-default-body"]').should("be.visible");
    });
});
