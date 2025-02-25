import pgp from "pg-promise";
import { InternalServerError } from "../../../shared/errors/Errors";
import { env } from "../../../shared/utils/env";

export default interface DatabaseConnection {
  query(statement: string, params: any): Promise<any>;
  close(): Promise<void>;
}

export class pgPromiseAdapter implements DatabaseConnection {
  connection: any;
  constructor() {
    try {
      this.connection = pgp()(env.DB_CONNECTION);
    } catch (e) {
      throw new InternalServerError({ cause: e });
    }
  }

  query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  close(): Promise<void> {
    return this.connection.$pool.end();
  }
}
