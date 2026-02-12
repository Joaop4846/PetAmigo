const Database = require('better-sqlite3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'petamigo.db');
const sqlite = new Database(dbPath);

sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS pets (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    especie TEXT NOT NULL,
    raca TEXT NOT NULL,
    idade INTEGER NOT NULL,
    clienteId TEXT NOT NULL,
    imagem TEXT,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (clienteId) REFERENCES clientes(id)
  );
`);

class SQLiteDatabase {
  findAll(collection, { search, searchField, sortBy, sortOrder = 'asc', filter } = {}) {
    let sql = `SELECT * FROM ${collection}`;
    const conditions = [];
    const params = [];

    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        conditions.push(`${key} = ?`);
        params.push(value);
      }
    }

    if (search && searchField) {
      conditions.push(`LOWER(${searchField}) LIKE ?`);
      params.push(`%${search.toLowerCase()}%`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    if (sortBy) {
      const order = sortOrder === 'desc' ? 'DESC' : 'ASC';
      sql += ` ORDER BY LOWER(${sortBy}) ${order}`;
    }

    return sqlite.prepare(sql).all(...params);
  }

  findById(collection, id) {
    return sqlite.prepare(`SELECT * FROM ${collection} WHERE id = ?`).get(id) || null;
  }

  create(collection, data) {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const item = { id, ...data, createdAt };

    const columns = Object.keys(item);
    const placeholders = columns.map(() => '?').join(', ');
    const values = columns.map(col => item[col]);

    sqlite.prepare(
      `INSERT INTO ${collection} (${columns.join(', ')}) VALUES (${placeholders})`
    ).run(...values);

    return item;
  }

  update(collection, id, data) {
    const existing = this.findById(collection, id);
    if (!existing) return null;

    const sets = Object.keys(data).map(key => `${key} = ?`);
    const values = Object.values(data);

    sqlite.prepare(
      `UPDATE ${collection} SET ${sets.join(', ')} WHERE id = ?`
    ).run(...values, id);

    return this.findById(collection, id);
  }

  delete(collection, id) {
    const result = sqlite.prepare(`DELETE FROM ${collection} WHERE id = ?`).run(id);
    return result.changes > 0;
  }

  deleteMany(collection, filter) {
    const conditions = Object.keys(filter).map(key => `${key} = ?`);
    const values = Object.values(filter);

    const result = sqlite.prepare(
      `DELETE FROM ${collection} WHERE ${conditions.join(' AND ')}`
    ).run(...values);

    return result.changes;
  }
}

const db = new SQLiteDatabase();

module.exports = db;
