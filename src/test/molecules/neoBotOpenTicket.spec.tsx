import { mount } from "@cypress/react";
import React from "react";
import { NeoBotOpenTicket } from "../../components/molecules";
import { QueueIconEmpty } from "../../img/png";

describe("NeoBotOpenTicket", () => {
    it("should have className", () => {
        mount(<NeoBotOpenTicket message="test" className="bg-opacity-0" />);
        cy.get('[data-testid="neobot-openTicket-body"]').should("have.class", "bg-opacity-0");
    });

    it("should render message props properly", () => {
        mount(<NeoBotOpenTicket message="Processing" showEllipsis={false} />);
        cy.get('[data-testid="neobot-openTicket-message"]').should("have.text", "Processing");
    });

    it("should render message and ellipsis props properly", () => {
        mount(<NeoBotOpenTicket message="Processing" showEllipsis={true} />);
        cy.get('[data-testid="neobot-openTicket-message"]').should("have.text", "Processing...");
    });

    it("should render ellipsis props properly", () => {
        mount(<NeoBotOpenTicket message="Processing" showEllipsis={true} />);
        cy.get('[data-testid="neobot-openTicket-ellipsis"]').should("exist").and("have.text", "...");
        cy.get('[data-testid="neobot-openTicket-ellipsis"]')
            .find("div:first-child")
            .should("have.class", "animate-show");
        cy.get('[data-testid="neobot-openTicket-ellipsis"]')
            .find("div:nth-child(2)")
            .should("have.class", "animate-show")
            .and("have.css", "animation-delay", "0.3s");
        cy.get('[data-testid="neobot-openTicket-ellipsis"]')
            .find("div:last-child")
            .should("have.class", "animate-show")
            .and("have.css", "animation-delay", "0.6s");
    });

    it("should render neoBot logo and its animation properly", () => {
        mount(<NeoBotOpenTicket message="Processing" showEllipsis={true} />);
        cy.get('[data-testid="neobot-openTicket-logo"]')
            .find("svg:nth-child(2)")
            .should("exist")
            .and("have.class", "animate-swing");
    });

    it("should render ticket image and its animation properly", () => {
        mount(<NeoBotOpenTicket message="Processing" showEllipsis={true} />);
        cy.get('[data-testid="neobot-openTicket-logo"]')
            .find("svg:first-child")
            .should("exist")
            .and("have.class", "animate-fadeJump");
        cy.get('[data-testid="neobot-openTicket-logo"]')
            .find("div:first-child")
            .should("exist")
            .and("have.class", "jumpIn");
    });

    it("should render img props properly", () => {
        mount(<NeoBotOpenTicket message="Processing" topRightImg={QueueIconEmpty} showEllipsis={true} />);
        cy.get('[data-testid="neobot-openTicket-inbox"]').find("img:first-child").should("exist");
    });

    it("should add the right class when message is too long", () => {
        mount(<NeoBotOpenTicket message="Processing processing processing" showEllipsis={true} />);
        cy.get('[data-testid="neobot-openTicket-message"]').should("have.class", "flex-col");
    });
});
