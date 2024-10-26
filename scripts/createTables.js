const { sql } = require('@vercel/postgres');

async function createDomainsTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS domains (
            id SERIAL PRIMARY KEY,
            domain_name VARCHAR(255) NOT NULL UNIQUE,
            site_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (site_id) REFERENCES sites(id) ON DELETE CASCADE
        );
    `;

    const createTriggerQuery = `
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER update_domains_updated_at
        BEFORE UPDATE ON domains
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `;

    try {
        // Execute the table creation query
        await sql`${createTableQuery}`;
        console.log("Table created successfully.");

        // Execute the trigger creation query
        await sql`${createTriggerQuery}`;
        console.log("Trigger created successfully.");
    } catch (error) {
        console.error("Error creating table or trigger:", error);
    }
}

createDomainsTable();
