import { mount } from "@cypress/react";
import ShadowBoxWrapper from "../../components/molecules/shadowBoxWrapper";
import React, { ReactElement, useRef } from "react";

interface Props {
    multipleChild: boolean;
}

const ShadowBoxWrapperWithRef = ({ multipleChild }: Props): ReactElement => {
    const refParent = useRef<HTMLUListElement>(null);
    return (
        <div className="h-32 flex items-center relative w-min">
            <ShadowBoxWrapper
                refParent={refParent}
                classNames={{
                    container: "overflow-y-scroll no-scrollbar h-28",
                    topShadowBox: "w-full h-10 absolute top-0 z-20",
                    bottomShadowBox: "w-full h-10 absolute bottom-0 z-20",
                }}
                linearGradient={{
                    first: "rgba(21,37,53,1)",
                    second: "rgba(21, 48, 76,1)",
                }}
            >
                <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 1</li>
                {multipleChild && <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 4</li>}
                {multipleChild && <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 8</li>}
                {multipleChild && <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 10</li>}
                {multipleChild && <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 112</li>}
            </ShadowBoxWrapper>
        </div>
    );
};

describe("ShadowBoxWrapper", () => {
    it("should have to correct classNames and linear gradient", () => {
        mount(
            <div className="relative h-32">
                <ShadowBoxWrapper
                    classNames={{
                        container: "overflow-y-scroll no-scrollbar h-28",
                        topShadowBox: "w-full h-10 absolute top-0 z-20",
                        bottomShadowBox: "w-full h-10 absolute bottom-0 z-20",
                    }}
                    linearGradient={{
                        first: "rgba(21,37,53,1)",
                        second: "rgba(21, 48, 76,1)",
                    }}
                >
                    <li className="h-96">Yolo 1</li>
                    <li className="h-96">Yolo 2</li>
                    <li className="h-96">Yolo 3</li>
                </ShadowBoxWrapper>
            </div>
        );
        cy.get('[data-testid="shadowBoxWrapperContainer"]').should("have.class", "overflow-y-scroll no-scrollbar h-28");
        cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("center");
        cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]')
            .should("have.class", "w-full h-10 absolute bottom-0 z-20")
            .should(
                "have.attr",
                "style",
                "background: linear-gradient(0deg, rgb(21, 37, 53) 0%, rgb(21, 48, 76) 55%, rgba(255, 0, 0, 0) 100%);"
            );

        cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]')
            .should("have.class", "w-full h-10 absolute top-0 z-20")
            .should(
                "have.attr",
                "style",
                "background: linear-gradient(rgb(21, 37, 53) 0%, rgb(21, 48, 76) 55%, rgba(255, 0, 0, 0) 100%);"
            );
    });

    it("should have to correct classNames and linear gradient", () => {
        mount(<ShadowBoxWrapperWithRef multipleChild={true} />);
        cy.get('[data-testid="shadowBoxWrapperContainer"]').should("have.class", "overflow-y-scroll no-scrollbar h-28");
        cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("center");
        cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]')
            .should("have.class", "w-full h-10 absolute bottom-0 z-20")
            .should(
                "have.attr",
                "style",
                "background: linear-gradient(0deg, rgb(21, 37, 53) 0%, rgb(21, 48, 76) 55%, rgba(255, 0, 0, 0) 100%);"
            );

        cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]')
            .should("have.class", "w-full h-10 absolute top-0 z-20")
            .should(
                "have.attr",
                "style",
                "background: linear-gradient(rgb(21, 37, 53) 0%, rgb(21, 48, 76) 55%, rgba(255, 0, 0, 0) 100%);"
            );
    });

    it("should display the correct shadowbox", () => {
        mount(
            <div className="relative h-32">
                <ShadowBoxWrapper
                    classNames={{
                        container: "overflow-y-scroll no-scrollbar h-28",
                        topShadowBox: "w-full h-10 absolute top-0 z-20",
                        bottomShadowBox: "w-full h-10 absolute bottom-0 z-20",
                    }}
                    linearGradient={{
                        first: "rgba(21,37,53,1)",
                        second: "rgba(21, 48, 76,1)",
                    }}
                >
                    <li className="h-96">Yolo 1</li>
                    <li className="h-96">Yolo 2</li>
                    <li className="h-96">Yolo 3</li>
                </ShadowBoxWrapper>
            </div>
        );
        cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("exist");
        cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("not.exist");
        cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("center");
        cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("exist");
        cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("exist");
        cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("bottom");
        cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("not.exist");
        cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("exist");
        cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("top");
        cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("exist");
        cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("not.exist");
    });

    it("should display the correct shadowbox", () => {
        mount(<ShadowBoxWrapperWithRef multipleChild={true} />);
        cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("exist");
        cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("not.exist");
        cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("center");
        cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("exist");
        cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("exist");
        cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("bottom");
        cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("not.exist");
        cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("exist");
        cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("top");
        cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("exist");
        cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("not.exist");
    });

    it("should not display shadowboxes if content is not overflowing", () => {
        mount(
            <div className="relative h-32">
                <ShadowBoxWrapper
                    classNames={{
                        container: "overflow-y-scroll no-scrollbar h-28",
                        topShadowBox: "w-full h-10 absolute top-0 z-20",
                        bottomShadowBox: "w-full h-10 absolute bottom-0 z-20",
                    }}
                    linearGradient={{
                        first: "rgba(21,37,53,1)",
                        second: "rgba(21, 48, 76,1)",
                    }}
                >
                    <li className="h-8">Yolo 1</li>
                    <li className="h-8">Yolo 2</li>
                    <li className="h-8">Yolo 3</li>
                </ShadowBoxWrapper>
            </div>
        );
        cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("not.exist");
        cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("not.exist");
    });
    it("should not display shadowboxes if content is not overflowing", () => {
        mount(<ShadowBoxWrapperWithRef multipleChild={false} />);
        cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("not.exist");
        cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("not.exist");
    });
});
