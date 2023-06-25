import { Time } from "@peculiar/asn1-x509";
import { SignerInfo } from "./signer_info";
export declare type MessageDigest = ArrayBuffer;
/**
 * ```asn
 * SigningTime  ::= Time
 * ```
 */
export declare class SigningTime extends Time {
}
/**
 * ```asn
 * Countersignature ::= SignerInfo
 * ```
 */
export declare class CounterSignature extends SignerInfo {
}
