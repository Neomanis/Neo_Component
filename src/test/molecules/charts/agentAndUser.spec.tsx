import { mount } from "@cypress/react";
import AgentAndUser from "../../../components/molecules/charts/agentAndUser";

describe("AgentAndUser", () => {
    it("should exist and be visible", () => {
        mount(<AgentAndUser agentNumber={10} userNumber={12} />);
        cy.get('[data-testid="user-and-agent-body"]').should("exist").and("be.visible");
    });

    it("should handle className if exist", () => {
        mount(<AgentAndUser agentNumber={10} userNumber={12} className="text-neo-yellow-sand" />);
        cy.get('[data-testid="user-and-agent-body"]').should("have.css", "color").and("eq", "rgb(226, 220, 143)");
    });
});
