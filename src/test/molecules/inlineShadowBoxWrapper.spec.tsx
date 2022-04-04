import { mount } from "@cypress/react";
import InlineShadowBoxWrapper from "../../components/molecules/inlineShadowBoxWrapper";
import React, { ReactElement, useRef } from "react";

interface Props {
    width: string;
}

const TestInlineShadowBoxWrapper = ({ width }: Props): ReactElement => {
    const refP = useRef<HTMLUListElement>(null);
    return (
        <div className="h-32 flex items-center relative w-min">
            <InlineShadowBoxWrapper
                refP={refP}
                classNames={{
                    container: "flex overflow-x-scroll no-scrollbar " + width,
                    leftShadowBox: "w-10 h-10 absolute left-0 z-20",
                    rightShadowBox: "w-10 h-10 absolute right-0 z-20",
                }}
                linearGradient={{
                    first: "rgba(21,37,53,1)",
                    second: "rgba(21, 48, 76,1)",
                }}
            >
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item1</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item4</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item8</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item10</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item112</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item124</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item148</li>
            </InlineShadowBoxWrapper>
        </div>
    );
};

describe("ShadowBoxWrapper", () => {
    it("should have to correct classNames and linear gradient", () => {
        mount(<TestInlineShadowBoxWrapper width="w-60" />);
        cy.get('[data-testid="inlineShadowBoxWrapperContainer"]').should(
            "have.class",
            "flex overflow-x-scroll no-scrollbar w-60"
        );
        cy.get('[data-testid="inlineShadowBoxWrapperContainer"]').scrollTo("center");
        cy.get('[data-testid="inlineShadowBoxWrapperRightShadowBox"]')
            .should("have.class", "w-10 h-10 absolute right-0 z-20")
            .should(
                "have.attr",
                "style",
                "background: linear-gradient(270deg, rgb(21, 37, 53) 0%, rgb(21, 48, 76) 35%, rgba(255, 0, 0, 0) 100%);"
            );

        cy.get('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]')
            .should("have.class", "w-10 h-10 absolute left-0 z-20")
            .should(
                "have.attr",
                "style",
                "background: linear-gradient(90deg, rgb(21, 37, 53) 0%, rgb(21, 48, 76) 35%, rgba(255, 0, 0, 0) 100%);"
            );
    });

    it("should display the correct shadowbox", () => {
        mount(<TestInlineShadowBoxWrapper width="w-60" />);
        cy.get('[data-testid="inlineShadowBoxWrapperRightShadowBox"]').should("exist");
        cy.get('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]').should("not.exist");
        cy.get('[data-testid="inlineShadowBoxWrapperContainer"]').scrollTo("center");
        cy.get('[data-testid="inlineShadowBoxWrapperRightShadowBox"]').should("exist");
        cy.get('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]').should("exist");
        cy.get('[data-testid="inlineShadowBoxWrapperContainer"]').scrollTo("right");
        cy.get('[data-testid="inlineShadowBoxWrapperRightShadowBox"]').should("not.exist");
        cy.get('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]').should("exist");
        cy.get('[data-testid="inlineShadowBoxWrapperContainer"]').scrollTo("left");
        cy.get('[data-testid="inlineShadowBoxWrapperRightShadowBox"]').should("exist");
        cy.get('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]').should("not.exist");
    });

    it("should not display shadowboxes if content is not overflowing", () => {
        mount(<TestInlineShadowBoxWrapper width="w-full" />);
        cy.get('[data-testid="inlineShadowBoxWrapperRightShadowBox"]').should("not.exist");
        cy.get('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]').should("not.exist");
    });
});
