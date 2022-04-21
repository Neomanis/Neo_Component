import { imgAvatar } from "../../../stories/fakeAvatar";
import { IUser } from "../../../interface";
import { mount } from "@cypress/react";
import UserInfo from "../../../components/molecules/user/userInfo";

const defaultUser = {
    uid: "ttest",
    name: { firstName: "Tech", lastName: "Test" },
    role: "Technician",
    language: "fr-FR",
    avatar: {
        encodedAvatar: imgAvatar,
        mimetype: "image/png",
        originalname: "blob-l-eponge.png",
    },
} as IUser;

const defaultEmptyUser = {
    uid: "ttest",
    language: "fr-FR",
} as IUser;

describe("UserInfo", () => {
    it("should be visible and display content props value", () => {
        const showAvatarEditor = cy.stub().as("open-editor");

        mount(<UserInfo user={defaultUser} setShowAvatarEditor={showAvatarEditor} />);
        cy.get('[data-testid="global-div-info-user"]').should("be.visible");
        cy.get('[data-testid="global-div-info-user"]').should("have.text", "Test TechTECHNICIEN");
    });

    it("should change style when asked", () => {
        const showAvatarEditor = cy.stub().as("open-editor");

        mount(
            <UserInfo
                user={defaultUser}
                setShowAvatarEditor={showAvatarEditor}
                imageSize={36}
                divInfoClassName={"bg-neo-blue"}
                nameClassName={"text-neo-yellow-sand"}
                roleClassName={"text-neo-light-grey"}
            />
        );

        cy.get('[data-testid="global-div-info-user"]')
            .should("have.css", "background-color")
            .and("eq", "rgb(34, 170, 255)");
        cy.get('[data-testid="name-info-user"]').should("have.css", "color").and("eq", "rgb(226, 220, 143)");
        cy.get('[data-testid="role-info-user"]').should("have.css", "color").and("eq", "rgb(218, 229, 229)");
        cy.get('[data-testid="profileImg-with-data-body"]').should("have.css", "height").and("eq", "144px");
    });

    it("should show and hide hover bubble when image is hover", () => {
        const showAvatarEditor = cy.stub().as("open-editor");

        mount(<UserInfo user={defaultUser} setShowAvatarEditor={showAvatarEditor} />);

        cy.get('[data-testid="user-image-zone"]').trigger("mouseover");
        cy.get('[data-testid="hover-bubble"]').should("be.visible");
        cy.get('[data-testid="user-image-zone"]').trigger("mouseout");
        cy.get('[data-testid="hover-bubble"]').should("not.exist");
    });

    it("should launch function on click", () => {
        const showAvatarEditor = cy.stub().as("open-editor");

        mount(<UserInfo user={defaultUser} setShowAvatarEditor={showAvatarEditor} />);
        cy.get('[data-testid="user-image-zone"]').click();
        cy.get("@open-editor").should("have.been.called");
    });

    it("should write default value if missing information on the user", () => {
        const showAvatarEditor = cy.stub().as("open-editor");

        mount(<UserInfo user={defaultEmptyUser} setShowAvatarEditor={showAvatarEditor} />);
        cy.get('[data-testid="global-div-info-user"]').should("not.have.text");
        cy.get('[data-testid="profileImg-with-data-body"]').should("have.attr", "alt").and("eq", "default img");
    });
});
