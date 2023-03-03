import * as SQLite from 'expo-sqlite';

function abreconcexao (){
 const database = SQLite.openDatabase('db.db');
 return database;
}

export const db = abreconcexao();