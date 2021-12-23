import { InputSelectSearchable } from "../../../components/atoms";
import { mount } from "@cypress/react";

const data = [
    {
        label: "Abricot",
        value: 1,
    },
    {
        label: "Banane",
        value: 2,
    },
    {
        label: "Cactus",
        value: 3,
    },
    {
        label: "Detergent",
        value: 4,
    },
    {
        label: "Destruction",
        value: 5,
    },
    {
        label: "Decheance",
        value: 6,
    },
    {
        label: "Detritus",
        value: 7,
    },
    {
        label: "Emergeance",
        value: 8,
    },
];

describe("InputSelectSearchable", () => {
    it("should be visible", () => {
        mount(
            <InputSelectSearchable
                isClearable={true}
                placeholder="test-section"
                isSearchable
                defaultValue={3}
                refForm="example 1"
                data={data}
            />
        );

        cy.get('[data-testid="inputSelectSearchable-body"]').should("be.visible");
        cy.get('[data-testid="inputSelectSearchableDot-body"]').should("not.be.visible");
    });
    it("should type in value", () => {
        mount(
            <InputSelectSearchable
                isClearable={true}
                placeholder="test-section"
                isSearchable
                defaultValue={3}
                refForm="example 1"
                data={data}
            />
        );
        const input = cy.get('[data-testid="inputSelectSearchable-body"]').get("input");
        input.click();
        input.type("H");
        input.should("have.value", "H");
    });
    it("should have 3 default value", () => {
        mount(
            <InputSelectSearchable
                isClearable={true}
                placeholder="test-section"
                isMulti
                isUpdateField
                // eslint-disable-next-line no-console
                updateFunction={(field, val) => console.log(field, val)}
                isSearchable
                defaultValue={[1, 2, 3]}
                refForm="example 1"
                data={data}
            />
        );
        const valuesInInput = cy.get('[data-testid="inputSelectSearchable-body"]').get("div.css-g1d714-ValueContainer");
        //we will find defaultValues + 1 since the input is also present in children section
        valuesInInput.children().should("have.length", 4);
    });
});
