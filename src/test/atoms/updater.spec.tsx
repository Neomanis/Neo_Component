import { mount } from "@cypress/react";
import Updater from "../../components/atoms/updater";

describe("Updater", () => {
    it("should call the callback function when clicking the icon", () => {
        const fCallback = cy.stub().as("close-callback");
        mount(<Updater isSuccess={true} isCancelable={true} fCallBackCancel={fCallback} />);
        cy.get('[data-testid="dotClose"]').click();
        cy.get("@close-callback").should("have.been.called");
    });
    it("should render closable props properly", () => {
        const fCallback = cy.stub().as("close-callback");
        mount(<Updater isSuccess={true} isCancelable={true} fCallBackCancel={fCallback} />);
        cy.get('[data-testid="dotClose"]').should("exist").and("have.text", "CANCEL");
    });
    it("should disable isCancelable props properly", () => {
        mount(<Updater isSuccess={false} isCancelable={false} className="test" />);
        cy.get('[data-testid="dotClose"]').should("not.exist");
    });
    it("should render className props properly", () => {
        mount(<Updater isSuccess={true} isCancelable={true} className="test" />);
        cy.get('[data-testid="dotClassName"]').should("have.class", "test");
    });
    it("should render isSuccess props properly", () => {
        mount(<Updater isSuccess={true} isCancelable={true} className="test" updateCooldown={1} />);
        cy.get('[data-testid="dotSuccess"]').should("have.text", "SUCCESS").and("have.class", "text-neo-green");
    });
    it("should render isError props properly", () => {
        mount(<Updater isError={true} isSuccess={false} isCancelable={true} className="test" updateCooldown={1} />);
        cy.get('[data-testid="dotError"]').should("have.text", "ERROR").and("have.class", "text-neo-red");
    });
    it("should render errorMessage props properly", () => {
        mount(
            <Updater
                errorMessage="error occured"
                isError={true}
                isSuccess={false}
                isCancelable={true}
                className="test"
                updateCooldown={1}
            />
        );
        cy.get('[data-testid="dotError"]').should("have.text", "error occured").and("have.class", "text-neo-red");
    });
    it("should render updating message properly", () => {
        mount(<Updater isUpdate={true} trigger={true} isSuccess={false} isCancelable={true} className="test" />);
        cy.get('[data-testid="dotUpdating"]').should("have.text", "UPDATING").and("have.class", "text-neo-blue");
    });
});
