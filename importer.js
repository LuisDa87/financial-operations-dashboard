import fs from 'fs';
import csv from 'csv-parser';
import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL is required. Copy .env.example values into your environment before running the importer.',
  );
}

const pool = new Pool({ connectionString });

/**
 * Imports a CSV file into a PostgreSQL table.
 *
 * This utility is intended for controlled development datasets. Table names are
 * provided internally by the application and must never come from user input.
 */
async function importCSV(filePath, tableName) {
  console.log(`Starting import for table: ${tableName}...`);

  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', async () => {
        const client = await pool.connect();

        try {
          for (const row of rows) {
            const columns = Object.keys(row).join(', ');
            const placeholders = Object.keys(row)
              .map((_, index) => `$${index + 1}`)
              .join(', ');
            const values = Object.values(row).map((value) =>
              value === '' ? null : value,
            );

            const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) ON CONFLICT DO NOTHING;`;
            await client.query(query, values);
          }

          console.log(`Import completed for table: ${tableName}.`);
          resolve();
        } catch (error) {
          console.error(`Import failed for table ${tableName}:`, error.message);
          reject(error);
        } finally {
          client.release();
        }
      })
      .on('error', reject);
  });
}

async function main() {
  console.log('Starting Financial Operations data import...');

  try {
    await importCSV('./database/customers.csv', 'customers');
    await importCSV('./database/platforms.csv', 'platforms');
    await importCSV('./database/invoices.csv', 'invoices');
    await importCSV('./database/transactions.csv', 'transactions');

    console.log('Data import completed successfully.');
  } catch (error) {
    console.error('Data import failed:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
