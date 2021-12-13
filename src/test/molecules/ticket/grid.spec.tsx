import Grid from "../../../components/molecules/ticket/grid";
import { mount } from "@cypress/react";
import { fakeGlpiUsers, fakeTicket } from "../../../stories/fakeObject";

describe("Grid", () => {
    it("should render properly", () => {
        mount(
            <Grid
                cols={2}
                rows={2}
                languageUser="fr_FR"
                ticketList={Array.from({ length: 28 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
            />
        );
        cy.get('[data-testid="grid-body"]').should("be.visible");
    });

    it("should render empty ticket hexagon if there is no tickets", () => {
        mount(<Grid cols={2} rows={2} languageUser="fr_FR" />);
        cy.get('[data-testid="ticket-empty-body"]').should("have.length", 4);
    });

    it("should not show the pagination ", () => {
        mount(
            <Grid
                cols={2}
                rows={2}
                languageUser="fr_FR"
                ticketList={Array.from({ length: 3 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
            />
        );
        cy.get('[data-testid="grid-page-number"]').should("not.exist");
    });

    it("should show display rows correctly ", () => {
        mount(
            <Grid
                cols={2}
                rows={2}
                languageUser="fr_FR"
                ticketList={Array.from({ length: 3 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
            />
        );
        cy.get('[data-testid="grid-row"]').eq(0).should("not.have.class", "translate-x-23");
        cy.get('[data-testid="grid-row"]').eq(1).should("have.class", "translate-x-23");
    });

    it("should show display rows correctly in reverse", () => {
        mount(
            <Grid
                cols={2}
                rows={2}
                languageUser="fr_FR"
                ticketList={Array.from({ length: 3 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
                reverseGrid
            />
        );
        cy.get('[data-testid="grid-row"]').eq(0).should("have.class", "translate-x-23");
        cy.get('[data-testid="grid-row"]').eq(1).should("not.have.class", "translate-x-23");
    });

    it("should show the right number of ticket", () => {
        mount(
            <Grid
                cols={2}
                rows={2}
                languageUser="fr_FR"
                ticketList={Array.from({ length: 28 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
            />
        );
        cy.get('[data-testid="grid-ticket"]').should("have.length", 28);
    });

    it("should have a fixed width if there is only one collumn", () => {
        mount(
            <Grid
                cols={1}
                rows={2}
                languageUser="fr_FR"
                ticketList={Array.from({ length: 28 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
            />
        );
        cy.get('[data-testid="grid-body"]').should("have.class", "w-52");
    });

    it("should have a translate if there is more than 3 collumn", () => {
        mount(
            <Grid
                cols={4}
                rows={2}
                languageUser="fr_FR"
                ticketList={Array.from({ length: 28 }, () => ({
                    ...fakeTicket,
                    id: Math.floor(Math.random() * 20),
                }))}
            />
        );
        cy.get('[data-testid="grid-element"]').should("have.class", "-translate-x-8");
    });

    it("should change pages when clicking on button", () => {
        mount(
            <Grid
                cols={2}
                rows={2}
                languageUser="fr_FR"
                ticketList={Array.from({ length: 28 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
                showPagination
            />
        );
        cy.get('[data-testid="grid-page-right-button"]').click();
        cy.get('[data-testid="grid-page-number"]').should("have.text", "2/7");
        cy.get('[data-testid="grid-page-left-button"]').click({ force: true });
        cy.get('[data-testid="grid-page-left-button"]').click({ force: true });
        cy.get('[data-testid="grid-page-number"]').should("have.text", "7/7");
        cy.get('[data-testid="grid-page-right-button"]').click();
        cy.get('[data-testid="grid-page-number"]').should("have.text", "1/7");
    });

    it("should show hoverTicket on hover", () => {
        mount(
            <Grid
                cols={2}
                rows={2}
                languageUser="fr_FR"
                glpiUsers={fakeGlpiUsers}
                ticketList={Array.from({ length: 28 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
                showPagination
                withHover
            />
        );
        cy.get('[data-testid="grid-ticket"]').first().trigger("mouseover");
        cy.get('[data-testid="hoverTicket-body"]').should("be.visible");
        cy.get('[data-testid="hoverTicket-body"]').first().trigger("mouseout");
        cy.get('[data-testid="hoverTicket-body"]').should("not.exist");
    });

    it("should trigger all callback", () => {
        const fChatModalOpen = cy.stub().as("chatModalOpen-callback");
        const fOpenModalCurrentTicket = cy.stub().as("openModalCurrentTicket-callback");
        const fCurrentTicket = cy.stub().as("currentTicket-callback");
        const fTicketModalOpen = cy.stub().as("ticketModalOpen-callback");

        mount(
            <Grid
                cols={2}
                rows={2}
                languageUser="fr_FR"
                glpiUsers={fakeGlpiUsers}
                ticketList={Array.from({ length: 28 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
                showPagination
                withHover
                fChatModalOpen={fChatModalOpen}
                fOpenModalCurrentTicket={fOpenModalCurrentTicket}
                fCurrentTicket={fCurrentTicket}
                fTicketModalOpen={fTicketModalOpen}
            />
        );

        cy.get('[data-testid="grid-ticket"]').first().click();
        cy.get("@openModalCurrentTicket-callback").should("have.been.called");
        cy.get("@currentTicket-callback").should("have.been.called");

        cy.get('[data-testid="hoverTicket-openChat-button"]').click();
        cy.get("@chatModalOpen-callback").should("have.been.called");

        cy.get('[data-testid="hoverTicket-expandTicket-button"]').click();
        cy.get("@openModalCurrentTicket-callback").should("have.been.called");
        cy.get("@currentTicket-callback").should("have.been.called");
        cy.get("@ticketModalOpen-callback").should("have.been.called");
    });
});
