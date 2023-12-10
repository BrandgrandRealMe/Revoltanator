import { DbContext, DbSet } from "dbcontext";
import Conversation from "../models/conversation.js";
import Options from "dbcontext/dist/models/options.js";
declare class AppDbContext extends DbContext {
    constructor(path?: string, options?: Options);
    conversations: DbSet<Conversation>;
}
export default AppDbContext;
