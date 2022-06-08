import { mount } from "@cypress/react";
import NumberAndSLA from "../../../components/molecules/statistics/numberAndSLA";
import { TicketLogo } from "../../../img/svg";

describe("NumberAndSLA", () => {
    it("should exist and be visible", () => {
        mount(<NumberAndSLA title={"Tickets Outside SLA"} subtitle={"service level agreement"} />);
        cy.get('[data-testid="number-and-SLA-body"]').should("exist").and("be.visible");
        cy.get('[data-testid="number-and-SLA-titles"]').should("exist").and("be.visible");
    });

    it("should handle className if exist", () => {
        mount(
            <NumberAndSLA
                title={"Tickets Outside SLA"}
                subtitle={"service level agreement"}
                className="text-neo-yellow-sand"
            />
        );
        cy.get('[data-testid="number-and-SLA-body"]').should("have.css", "color").and("eq", "rgb(226, 220, 143)");
    });

    it("should display properly svg and pill", () => {
        mount(
            <NumberAndSLA
                title={"Tickets Outside SLA"}
                subtitle={"service level agreement"}
                className="text-neo-yellow-sand"
                ticketNumber={25}
                svg={<TicketLogo fill={"#FFF"} width={40} />}
            />
        );
        cy.get('[data-testid="number-and-SLA-ticket-diag-body"]').should("exist").and("be.visible");
        cy.get('[data-testid="number-and-SLA-svg"]').should("exist").and("be.visible");
        cy.get('[data-testid="number-and-SLA-ticket-diag-body"]').find("div:first-child").should("have.text", "25");
    });

    it("should display properly TTO and TTR", () => {
        mount(
            <NumberAndSLA
                title={"Tickets Outside SLA"}
                subtitle={"service level agreement"}
                className="text-neo-yellow-sand"
                TTO={20}
                TTR={15}
            />
        );
        cy.get('[data-testid="number-and-SLA-TTO-TTR-body"]').should("exist").and("be.visible");
    });
});
