/// <reference types="node" />
import { CurveTypes, NamedCurveAlgorithms } from "../../../cipher/const";
import { FragmentedHandshake } from "../../../record/message/fragment";
import { Handshake } from "../../../typings/domain";
import { HandshakeType } from "../../const";
export declare class ServerKeyExchange implements Handshake {
    ellipticCurveType: CurveTypes;
    namedCurve: NamedCurveAlgorithms;
    publicKeyLength: number;
    publicKey: Buffer;
    hashAlgorithm: number;
    signatureAlgorithm: number;
    signatureLength: number;
    signature: Buffer;
    msgType: HandshakeType;
    messageSeq?: number;
    static readonly spec: {
        ellipticCurveType: any;
        namedCurve: any;
        publicKeyLength: any;
        publicKey: any;
        hashAlgorithm: any;
        signatureAlgorithm: any;
        signatureLength: any;
        signature: any;
    };
    constructor(ellipticCurveType: CurveTypes, namedCurve: NamedCurveAlgorithms, publicKeyLength: number, publicKey: Buffer, hashAlgorithm: number, signatureAlgorithm: number, signatureLength: number, signature: Buffer);
    static createEmpty(): ServerKeyExchange;
    static deSerialize(buf: Buffer): ServerKeyExchange;
    serialize(): Buffer;
    toFragment(): FragmentedHandshake;
}
