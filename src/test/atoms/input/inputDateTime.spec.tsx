import { InputDateTime } from "../../../components/atoms";
import { mount } from "@cypress/react";
import { useForm } from "react-hook-form";
import { ReactElement } from "react";

function InputDateTimeTest(): ReactElement {
    const formMethods = useForm();
    return (
        <InputDateTime
            defaultValue={new Date()}
            refForm="date"
            formMethods={formMethods}
            // eslint-disable-next-line no-console
            updateFunction={(refField, data) => console.log(refField, data)}
        />
    );
}

describe("InputDateTime", () => {
    it("should be visible", () => {
        mount(<InputDateTimeTest />);

        cy.get('[data-testid="inputDateTime-body"]').should("be.visible");
    });
});
