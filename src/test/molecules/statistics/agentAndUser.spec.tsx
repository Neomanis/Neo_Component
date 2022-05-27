import { mount } from "@cypress/react";
import AgentAndUser from "../../../components/molecules/statistics/agentAndUser";

describe("AgentAndUser", () => {
    it("should exist and be visible", () => {
        mount(<AgentAndUser agentNumber={10} userNumber={12} />);
        cy.get('[data-testid="user-and-agent-body"]').should("exist").and("be.visible");
    });

    it("should handle className and color if exist", () => {
        mount(<AgentAndUser agentNumber={10} userNumber={12} className="text-neo-yellow-sand" svgHexaColor="#c5c" />);
        cy.get('[data-testid="user-and-agent-body"]').should("have.css", "color").and("eq", "rgb(226, 220, 143)");
        cy.get('[data-testid="user-and-agent-svg"]').should("have.attr", "fill").and("equal", "#c5c");
    });
});
