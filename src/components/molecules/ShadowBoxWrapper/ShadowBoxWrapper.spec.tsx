/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import ShadowBoxWrapper from "./ShadowBoxWrapper";
import TestWrapper from "./TestWrapper";

test.use({ viewport: { width: 500, height: 500 } });

// shadow boxes values are not the same between chromium and firefox/webkit
// test("should have to correct classNames and linear gradient", async ({ mount }) => {
//     const component = await mount(
//         <div className="relative h-32">
//             <ShadowBoxWrapper
//                 classNames={{
//                     container: "overflow-y-scroll no-scrollbar h-28",
//                     topShadowBox: "w-full h-10 absolute top-0 z-20",
//                     bottomShadowBox: "w-full h-10 absolute bottom-0 z-20",
//                 }}
//                 linearGradient={{
//                     first: "rgba(21,37,53,1)",
//                     second: "rgba(21, 48, 76,1)",
//                 }}
//             >
//                 <li className="h-96">Yolo 1</li>
//                 <li className="h-96">Yolo 2</li>
//                 <li className="h-96">Yolo 3</li>
//             </ShadowBoxWrapper>
//         </div>
//     );

//     await component
//         .locator('[data-testid="shadowBoxWrapperContainer"]')
//         .evaluate((el) => el.scrollTo({ top: el.clientHeight / 2 }));

//     await expect(component.locator('[data-testid="shadowBoxWrapperBottomShadowBox"]')).toHaveClass(
//         /w-full h-10 absolute bottom-0 z-20/
//     );
//     await expect(component.locator('[data-testid="shadowBoxWrapperBottomShadowBox"]')).toHaveAttribute(
//         "style",
//         "background: linear-gradient(0deg, rgb(21, 37, 53) 0%, rgb(21, 48, 76) 55%, rgba(255, 0, 0, 0) 100%);"
//     );

//     await expect(component.locator('[data-testid="shadowBoxWrapperTopShadowBox"]')).toHaveClass(
//         /w-full h-10 absolute top-0 z-20/
//     );
//     await expect(component.locator('[data-testid="shadowBoxWrapperTopShadowBox"]')).toHaveAttribute(
//         "style",
//         "background: linear-gradient(rgb(21, 37, 53) 0%, rgb(21, 48, 76) 55%, rgba(255, 0, 0, 0) 100%);"
//     );
// });

// test("should have to correct classNames and linear gradient yay", async ({ mount }) => {
//     const component = await mount(<ShadowBoxWrapperWithRef multipleChild={true} />);
//     cy.get('[data-testid="shadowBoxWrapperContainer"]').should("have.class", "overflow-y-scroll no-scrollbar h-28");
//     cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("center");
//     cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]')
//         .should("have.class", "w-full h-10 absolute bottom-0 z-20")
//         .should(
//             "have.attr",
//             "style",
//             "background: linear-gradient(0deg, rgb(21, 37, 53) 0%, rgb(21, 48, 76) 55%, rgba(255, 0, 0, 0) 100%);"
//         );

//     cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]')
//         .should("have.class", "w-full h-10 absolute top-0 z-20")
//         .should(
//             "have.attr",
//             "style",
//             "background: linear-gradient(rgb(21, 37, 53) 0%, rgb(21, 48, 76) 55%, rgba(255, 0, 0, 0) 100%);"
//         );
// });

// test("should display the correct shadowbox", async ({ mount }) => {
//     const component = await mount(
//         <div className="relative h-32">
//             <ShadowBoxWrapper
//                 classNames={{
//                     container: "overflow-y-scroll no-scrollbar h-28",
//                     topShadowBox: "w-full h-10 absolute top-0 z-20",
//                     bottomShadowBox: "w-full h-10 absolute bottom-0 z-20",
//                 }}
//                 linearGradient={{
//                     first: "rgba(21,37,53,1)",
//                     second: "rgba(21, 48, 76,1)",
//                 }}
//             >
//                 <li className="h-96">Yolo 1</li>
//                 <li className="h-96">Yolo 2</li>
//                 <li className="h-96">Yolo 3</li>
//             </ShadowBoxWrapper>
//         </div>
//     );
//     cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("exist");
//     cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("not.exist");
//     cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("center");
//     cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("exist");
//     cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("exist");
//     cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("bottom");
//     cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("not.exist");
//     cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("exist");
//     cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("top");
//     cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("exist");
//     cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("not.exist");
// });

// test("should display the correct shadowbox yay", async ({ mount }) => {
//     const component = await mount(<ShadowBoxWrapperWithRef multipleChild={true} />);
//     cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("exist");
//     cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("not.exist");
//     cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("center");
//     cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("exist");
//     cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("exist");
//     cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("bottom");
//     cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("not.exist");
//     cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("exist");
//     cy.get('[data-testid="shadowBoxWrapperContainer"]').scrollTo("top");
//     cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("exist");
//     cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("not.exist");
// });

// test("should not display shadowboxes if content is not overflowing", async ({ mount }) => {
//     const component = await mount(
//         <div className="relative h-32">
//             <ShadowBoxWrapper
//                 classNames={{
//                     container: "overflow-y-scroll no-scrollbar h-28",
//                     topShadowBox: "w-full h-10 absolute top-0 z-20",
//                     bottomShadowBox: "w-full h-10 absolute bottom-0 z-20",
//                 }}
//                 linearGradient={{
//                     first: "rgba(21,37,53,1)",
//                     second: "rgba(21, 48, 76,1)",
//                 }}
//             >
//                 <li className="h-8">Yolo 1</li>
//                 <li className="h-8">Yolo 2</li>
//                 <li className="h-8">Yolo 3</li>
//             </ShadowBoxWrapper>
//         </div>
//     );
//     cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("not.exist");
//     cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("not.exist");
// });
// test("should not display shadowboxes if content is not overflowing yay", async ({ mount }) => {
//     const component = await mount(<ShadowBoxWrapperWithRef multipleChild={false} />);
//     cy.get('[data-testid="shadowBoxWrapperBottomShadowBox"]').should("not.exist");
//     cy.get('[data-testid="shadowBoxWrapperTopShadowBox"]').should("not.exist");
// });
