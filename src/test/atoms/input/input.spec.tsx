/* eslint-disable no-undef */

import React from "react";
import { Input } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("Input", () => {
    it("should be visible", () => {
        mount(<Input refForm="input" required={false} typeInput="text" />);

        cy.get('[data-testid="input-body"]').should("be.visible");
    });

    it("should show input and be of type text", () => {
        mount(<Input refForm="input" required={false} typeInput="text" />);
        cy.get('[data-testid="input-body"]').should("be.visible").find('[type="text"]').should("exist");
    });

    it("should show correct label", () => {
        mount(<Input refForm="input" required={false} typeInput="text" label="I'm a input" />);
        cy.get('[data-testid="input-body"]').should("be.visible").should("contain.text", "I'm a input");
    });

    it("should trigger onBlurCallBack and onChangeCallBack", () => {
        const onBlurCallBack = cy.stub().as("el-onBlurCallback");
        const onChangeCallBack = cy.stub().as("el-onChangeCallBack");

        mount(
            <Input
                refForm="input"
                required={false}
                typeInput="text"
                onBlurCallBack={onBlurCallBack}
                onChangeCallBack={onChangeCallBack}
            />
        );

        cy.get('[data-testid="input"]').type("H");
        cy.get("@el-onChangeCallBack").should("have.been.called");
        cy.get('[data-testid="input"]').blur();
        cy.get("@el-onBlurCallback").should("have.been.called");
    });
});
