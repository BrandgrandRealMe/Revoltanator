/// <reference types="node" />
import { SignatureSchemes } from "../../../cipher/const";
import { FragmentedHandshake } from "../../../record/message/fragment";
import { Handshake } from "../../../typings/domain";
import { HandshakeType } from "../../const";
export declare class CertificateVerify implements Handshake {
    algorithm: SignatureSchemes;
    signature: Buffer;
    msgType: HandshakeType;
    messageSeq?: number;
    static readonly spec: {
        algorithm: any;
        signature: any;
    };
    constructor(algorithm: SignatureSchemes, signature: Buffer);
    static createEmpty(): CertificateVerify;
    static deSerialize(buf: Buffer): CertificateVerify;
    serialize(): Buffer;
    toFragment(): FragmentedHandshake;
}
