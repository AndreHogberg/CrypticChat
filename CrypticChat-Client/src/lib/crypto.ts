export const createCryptoKeyPair = async(): Promise<CryptoKeyPair> => {
    return await window.crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1,0,1]),
        hash: "SHA-256"
    },
    true,
    ["encrypt", "decrypt"]) as CryptoKeyPair
}

export const encryptMessage = async (message: string, key: CryptoKey): Promise<ArrayBuffer> => {
    let encodedMessage = new TextEncoder().encode(message);

    return await window.crypto.subtle.encrypt({
        name: "RSA-OAEP"
    },
    key,
    encodedMessage ) as ArrayBuffer
}

export const decryptMessage = async (cipherText: ArrayBuffer, key: CryptoKey): Promise<string> => {
    let decryptedMessage = await window.crypto.subtle.decrypt({
        name: "RSA-OAEP"
    },
    key,
    cipherText) as ArrayBuffer

    return new TextDecoder().decode(decryptedMessage);
}