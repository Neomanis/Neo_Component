import JSEncrypt from "jsencrypt";
import { frontEncrypt } from "../../../components/utils/crypto/frontUtils";
import { publicKey, privateKey } from "./keys";

const password = "Konbawa";
describe("JSEncrypt", () => {
    it("Should encrypt", () => {
        const encrypted = frontEncrypt(password, publicKey);
        expect(encrypted).to.not.equal(password);
        const jsEncrypt = new JSEncrypt();
        jsEncrypt.setPrivateKey(privateKey);
        expect(jsEncrypt.decrypt(encrypted)).to.equal(password);
    });
    it("Should throw", () => {
        expect(() => frontEncrypt(password, "bad RSA key")).to.throw("Encryption went wrong");
    });
});
