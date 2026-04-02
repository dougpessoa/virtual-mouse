// src/@types/absurd-sql.d.ts

declare module "absurd-sql" {
	export class SQLiteFS {
		constructor(FS: any, backend: any);
	}
}

declare module "absurd-sql/dist/indexeddb-backend" {
	export default class IndexedDBBackend {
		constructor(name?: string);
		init(): Promise<void>;
	}
}

declare module "@jlongster/sql.js" {
	import * as SQL from "sql.js";
	export = SQL;
}
