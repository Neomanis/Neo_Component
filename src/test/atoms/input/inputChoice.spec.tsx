import { InputChoice } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("InputChoice", () => {
    it("should have a correct number of child", () => {
        mount(
            <InputChoice
                data={[
                    { label: "data1", value: 1 },
                    { label: "data2", value: 2 },
                    { label: "data3", value: 3 },
                ]}
            />
        );

        cy.get('[data-testid="inputChoice-body"]').should("exist");
        cy.get('[data-testid="inputChoice-body"]').should("be.visible");
        cy.get('[data-testid="inputChoice-list"]').children().should("have.length", 3);
    });

    it("should change his style if have className props", () => {
        mount(
            <InputChoice
                data={[{ label: "data1", value: 1 }]}
                className="rounded"
                cardClassName="bg-neo-light-grey"
                labelClassName="text-neo-yellow-sand"
            />
        );

        cy.get('[data-testid="inputChoice-body"]').should("have.css", "border-radius").and("eq", "4px");
        cy.get('[data-testid="inputChoice-list"]')
            .should("have.css", "background-color")
            .and("eq", "rgb(218, 229, 229)");
        cy.get('[data-testid="inputChoice-list"]>div').should("have.css", "color").and("eq", "rgb(226, 220, 143)");
    });

    it("should display label and change his style if exist", () => {
        mount(<InputChoice data={[{ label: "data1", value: 1 }]} label="Le Label" titleClassName="text-xl" />);

        cy.get('[data-testid="inputChoice-label"]').should("exist");
        cy.get('[data-testid="inputChoice-label"]').should("be.visible");
        cy.get('[data-testid="inputChoice-label"]').should("have.css", "font-size").and("eq", "20px");
    });

    it("should send correctly the callback function", () => {
        const fCallBack = cy.stub().as("send-information");

        mount(
            <InputChoice
                data={[
                    { label: "data1", value: 1 },
                    { label: "data2", value: 2 },
                    { label: "data3", value: 3 },
                ]}
                fCallBack={fCallBack}
            />
        );

        cy.get('[data-testid="inputChoice-list"]>div').eq(1).click();
        cy.get("@send-information").should("have.been.called");
    });
});
