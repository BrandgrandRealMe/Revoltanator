import { DbContext, DbSet } from "dbcontext";
class AppDbContext extends DbContext {
    constructor(path, options) {
        super(path, options);
    }
    conversations = new DbSet("conversations");
}
export default AppDbContext;
//# sourceMappingURL=app-dbcontext.js.map