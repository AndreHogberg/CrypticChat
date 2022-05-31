export const createCryptoKeyPair = async() => {
    return await window.crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1,0,1]),
        hash: "SHA-256"
    },
    true,
    ["encrypt", "decrypt"]) as CryptoKeyPair
}

export const encryptMessage = (message: string, key: CryptoKey) => {

}

export const decryptMessage = (cipherText: ArrayBuffer, key: CryptoKey) => {

}