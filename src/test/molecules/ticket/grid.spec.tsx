import { mount } from "@cypress/react";
import { Grid } from "../../../components/molecules";
import { fakeTicket } from "../../../stories/fakeObject";

describe("Grid", () => {
    it("should render properly", () => {
        mount(
            <Grid
                cols={2}
                rows={2}
                ticketList={Array.from({ length: 28 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
            />
        );
        cy.get('[data-testid="grid-body"]').should("be.visible");
    });
    it("should render empty ticket hexagon if there is no tickets", () => {
        mount(<Grid cols={2} rows={2} />);
        cy.get('[data-testid="ticket-empty-body"]').should("have.length", 4);
    });
    it("should not show the pagination ", () => {
        mount(
            <Grid
                cols={2}
                rows={2}
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
                ticketList={Array.from({ length: 3 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
            />
        );
        cy.get('[data-testid="grid-row"]').eq(0).should("not.have.class", "translate-x-[80px]");
        cy.get('[data-testid="grid-row"]').eq(1).should("have.class", "translate-x-[80px]");
    });
    it("should show display rows correctly in reverse", () => {
        mount(
            <Grid
                cols={2}
                rows={2}
                ticketList={Array.from({ length: 3 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
                reverseGrid
            />
        );
        cy.get('[data-testid="grid-row"]').eq(0).should("have.class", "translate-x-[80px]");
        cy.get('[data-testid="grid-row"]').eq(1).should("not.have.class", "translate-x-[80px]");
    });
    it("should add position to unpositioned tickets", () => {
        const fNewPositionedTicket = cy.stub().as("newPositionedTicket-callback");
        mount(
            <Grid
                cols={2}
                rows={2}
                ticketList={[
                    { ...fakeTicket, position: { col: 0, grid: 0, row: 0 } },
                    ...Array.from({ length: 3 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) })),
                ]}
                gridId="inventory"
                fNewPositionedTicket={fNewPositionedTicket}
            />
        );
        cy.get("@newPositionedTicket-callback").should("have.been.called");
    });
    it("should change pages when clicking on button", () => {
        mount(
            <Grid
                cols={2}
                rows={2}
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
    it("should trigger all callback", () => {
        const fCurrentTicket = cy.stub().as("currentTicket-callback");
        mount(
            <Grid
                cols={2}
                rows={2}
                ticketList={Array.from({ length: 28 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
                showPagination
                fCurrentTicket={fCurrentTicket}
            />
        );
        cy.get('[data-testid="grid-ticket"]').first().click();
        cy.get("@currentTicket-callback").should("have.been.called");
    });
});
