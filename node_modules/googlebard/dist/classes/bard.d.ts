import Options from "../models/options.js";
import AppDbContext from "./app-dbcontext.js";
import Conversation from "../models/conversation.js";
declare class Bard {
    private options;
    private axios;
    db: AppDbContext;
    private cookies;
    constructor(cookies: string, options?: Options);
    private waitForLoad;
    addConversation(id: string): Conversation;
    getConversationById(id?: string): Conversation;
    getAllConversations(): Conversation[];
    resetConversation(id?: string): void;
    private ParseResponse;
    private GetRequestParams;
    ask(prompt: string, conversationId?: string): Promise<any>;
    askStream(data: (arg0: string) => void, prompt: string, conversationId?: string): Promise<any>;
    private send;
}
export default Bard;
