import { mount } from "@cypress/react";
import ChartRangeSelector from "../../../components/molecules/charts/chartRangeSelector";

describe("ChartRangeSelector", () => {
    it("init ChartRangeSelector and get default dates", () => {
        const fCallBackDatesInit = cy.stub().as("dates-init-callback");
        mount(<ChartRangeSelector fCallBackData={fCallBackDatesInit} />);
        cy.get('[data-testid="chartRangeSelector-body"]').should("exist").and("be.visible");
        cy.get("@dates-init-callback").should("have.been.called");
    });
});
