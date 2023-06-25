/// <reference types="node" />
import Cipher, { CipherHeader, SessionTypes } from "./abstract";
/**
 * This class implements AEAD cipher family.
 */
export default class AEADCipher extends Cipher {
    keyLength: number;
    nonceLength: number;
    ivLength: number;
    authTagLength: number;
    nonceImplicitLength: number;
    nonceExplicitLength: number;
    clientWriteKey?: Buffer;
    serverWriteKey?: Buffer;
    clientNonce?: Buffer;
    serverNonce?: Buffer;
    constructor();
    get summary(): {};
    init(masterSecret: Buffer, serverRandom: Buffer, clientRandom: Buffer): void;
    /**
     * Encrypt message.
     */
    encrypt(type: SessionTypes, data: Buffer, header: CipherHeader): Buffer;
    /**
     * Decrypt message.
     */
    decrypt(type: SessionTypes, data: Buffer, header: CipherHeader): Buffer;
}
