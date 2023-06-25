import { CipherContext } from "../../context/cipher";
import { DtlsContext } from "../../context/dtls";
import { SrtpContext } from "../../context/srtp";
import { TransportContext } from "../../context/transport";
import { ClientHello } from "../../handshake/message/client/hello";
export declare const flight2: (udp: TransportContext, dtls: DtlsContext, cipher: CipherContext, srtp: SrtpContext) => (clientHello: ClientHello) => void;
