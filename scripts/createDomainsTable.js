const { sql } = require('@vercel/postgres');

require('dotenv').config();

async function createDomainsTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS domains (
            id SERIAL PRIMARY KEY,
            domain_name VARCHAR(255) NOT NULL UNIQUE,
            site_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (site_id) REFERENCES sites(id) ON DELETE CASCADE
        );
    `;

    try {
        // Directly use sql`query` instead of sql`${query}`
        const result = await sql` ${query} `;
        console.log("Table created successfully:", result);
    } catch (error) {
        console.error("Error creating table:", error);
    }
}

createDomainsTable();