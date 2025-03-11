//AI generated class 

// prompt 1
// -----------
// how can I create a connection pool with my neon postgres instance 
// This is the connection string 
// <example_connection_string>

// prompt 2 

// can you modify the pool class so that it has a method that allows me to pass 
// a query as well as the arguments for the query? I want it to export an
// instance of the pool in order to follow a singleton design pattern

const { Pool } = require('pg');

class DatabasePool {
  constructor() {
    if (DatabasePool.instance) {
      return DatabasePool.instance;
    }

    // Create the connection pool
    this.pool = new Pool({
      connectionString: 'postgresql://neondb_owner:npg_AaTpE2VDZB9n@ep-tiny-art-a8cmwf3r-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
      connectionTimeoutMillis: 2000, // How long to wait for a connection
    });

    // Initialize connection error handling
    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err);
    });

    DatabasePool.instance = this;
  }

  /**
   * Execute a query with parameters
   * @param {string} text - SQL query text
   * @param {Array} params - Query parameters
   * @returns {Promise<Object>} Query result
   */
  async query(text, params = []) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }

  /**
   * Execute a transaction with multiple queries
   * @param {Function} callback - Callback function that accepts a client and performs queries
   * @returns {Promise<*>} Transaction result
   */
  async transaction(callback) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Close all pool connections
   * @returns {Promise<void>}
   */
  async end() {
    await this.pool.end();
  }
}

// Export a singleton instance
const db = new DatabasePool();
Object.freeze(db);

module.exports = db;