import AvatarHandler from "../../components/organism/avatarHandler";
import { mount } from "@cypress/react";
import { imgAvatar } from "../../stories/fakeAvatar";
import { IUser } from "../../interface";

const defaultUser = {
    uid: "ttest",
    name: { firstName: "Tech", lastName: "Test" },
    role: "technicien",
    language: "fr-FR",
    avatar: {
        encodedAvatar: imgAvatar,
        mimetype: "image/png",
        originalname: "blob-l-eponge.png",
    },
} as IUser;

describe("AvatarHandler", () => {
    it("should userInfo be visible and avatarEditor not", () => {
        const fCallBackUploadAvatar = cy.stub().as("upload-avatar");

        mount(<AvatarHandler user={defaultUser} fCallBackUploadAvatar={fCallBackUploadAvatar} editorWidth={150} />);
        cy.get('[data-testid="global-div-info-user"]').should("be.visible");
        cy.get('[data-testid="global-div-avatar-editor"]').should("not.exist");
    });

    it("should show avatarEditor on user image click", () => {
        const fCallBackUploadAvatar = cy.stub().as("upload-avatar");

        mount(<AvatarHandler user={defaultUser} fCallBackUploadAvatar={fCallBackUploadAvatar} editorWidth={150} />);

        cy.get('[data-testid="global-div-avatar-editor"]').should("not.exist");
        cy.get('[data-testid="user-image-zone"]').click();
        cy.get('[data-testid="global-div-avatar-editor"]').should("be.visible");
    });
});
