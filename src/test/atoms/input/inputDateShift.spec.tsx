import { InputDateShift } from "../../../components/atoms";
import { mount } from "@cypress/react";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";

function InputDateShiftTest(): ReactElement {
    const formMethods = useForm();
    return (
        <InputDateShift
            formMethods={formMethods}
            date={new Date()}
            label="date"
            refForm="date"
            tabProps={[{ value: 1, label: "hello" }]}
        />
    );
}

describe("InputDateShift", () => {
    it("should be visible", () => {
        mount(<InputDateShiftTest />);

        cy.get('[data-testid="inputDateShift-body"]').should("be.visible");
    });
});
