import { CipherContext } from "../../context/cipher";
import { DtlsContext } from "../../context/dtls";
import { SrtpContext } from "../../context/srtp";
import { TransportContext } from "../../context/transport";
import { FragmentedHandshake } from "../../record/message/fragment";
import { Flight } from "../flight";
export declare class Flight4 extends Flight {
    private cipher;
    private srtp;
    constructor(udp: TransportContext, dtls: DtlsContext, cipher: CipherContext, srtp: SrtpContext);
    exec(clientHello: FragmentedHandshake, certificateRequest?: boolean): Promise<void>;
    private sendServerHello;
    private sendCertificate;
    private sendServerKeyExchange;
    private sendCertificateRequest;
    private sendServerHelloDone;
}
