import { mount } from "@cypress/react";
import InfoDot from "../../components/atoms/infoDot";

describe("InfoDot", () => {
    // it("should call the callback function when clicking the icon", () => {
    //     const fCallback = cy.stub().as("close-callback");
    //     mount(<InfoDot isSuccess={true} isCancelable={true} fCallBackCancel={fCallback} />);
    //     cy.get('[data-testid="dotClose"]').click();
    //     cy.get("@close-callback").should("have.been.called");
    // });
    // it("should render closable props properly", () => {
    //     const fCallback = cy.stub().as("close-callback");
    //     mount(<InfoDot isSuccess={true} isCancelable={true} fCallBackCancel={fCallback} />);
    //     cy.get('[data-testid="dotClose"]').should("exist").and("have.text", "CANCEL");
    // });
    // it("should disable closable props properly", () => {
    //     mount(<InfoDot isSuccess={false} isCancelable={false} className="test" />);
    //     cy.get('[data-testid="dotClose"]').should("not.exist");
    // });
    // it("should render className props properly", () => {
    //     mount(<InfoDot isSuccess={true} isCancelable={true} className="test" />);
    //     cy.get('[data-testid="dotClassName"]').should("have.class", "test");
    // });
    // it("should render isSuccess props properly", () => {
    //     mount(<InfoDot isSuccess={true} isCancelable={true} className="test" updateCooldown={1} />);
    //     cy.get('[data-testid="dotSuccess"]').should("have.text", "SUCCESS").and("have.class", "text-neo-green");
    // });
    // it("should render isSuccess false props properly", () => {
    //     mount(<InfoDot isSuccess={false} isCancelable={true} className="test" updateCooldown={1} />);
    //     cy.get('[data-testid="dotError"]').should("have.text", "ERROR").and("have.class", "text-neo-red");
    // });
    // it("should render updating message properly", () => {
    //     mount(<InfoDot isSuccess={false} isCancelable={true} className="test" />);
    //     cy.get('[data-testid="dotUpdating"]').should("have.text", "UPDATING").and("have.class", "text-neo-blue");
    // });
});
