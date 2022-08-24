import JSEncrypt from "jsencrypt";

export function frontEncrypt(toEncrypt: string, publicKey: string): string {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const encrypted = encrypt.encrypt(toEncrypt);
    if (!encrypted) {
        throw "Encryption went wrong";
    }
    return encrypted;
}
