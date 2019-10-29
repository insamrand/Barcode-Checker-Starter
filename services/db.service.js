import * as SQLite from "expo-sqlite";

const dbName = "barcodeDB.db";
const tableName = "BarcodeHistory";

const db = SQLite.openDatabase(dbName);

export default class DBService {
  init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY NOT NULL, barcodeData text);`,
          [],
          () => {
            console.log("db ready");

            // สั่ง reolve เพื่อยืนยันการทำงานที่สมบูรณ์
            resolve();
          }
        );
      });
    });
  }
}
