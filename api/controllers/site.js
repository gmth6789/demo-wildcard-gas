// controllers/site.js

const { sql } = require('@vercel/postgres');
//const { addDomainToVercel, verifyDomain, removeDomainFromVercelProject } = require('../lib/domainHandlers');





async function createSite(req, res) {
    const { key, name, host, theme, template, settings } = req.body;

    try {
        const result = await sql`
            INSERT INTO site (key, name, host, theme, template, settings) 
            VALUES (${key}, ${name}, ${host}, ${theme}, ${template}, ${settings}) 
            RETURNING *;`;

        return res.status(201).json({ message: "Site created successfully", site: result[0] });
    } catch (error) {
        console.error("Error creating site:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


async function getAllSites(req, res) {
    try {
        const result = await sql`SELECT * FROM site;`;
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching sites:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Get a single site by ID
async function getSiteById(req, res) {
    const { id } = req.params;

    try {
        const result = await sql`SELECT * FROM site WHERE site_id = ${id};`;
        if (result.length === 0) {
            return res.status(404).json({ error: "Site not found" });
        }
        return res.status(200).json(result[0]);
    } catch (error) {
        console.error("Error fetching site:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Update a site by ID
async function updateSite(req, res) {
    const { id } = req.params;
    const { key, name, host, theme, template, settings } = req.body;

    try {
        const result = await sql`
            UPDATE site
            SET key = ${key}, name = ${name}, host = ${host}, theme = ${theme}, template = ${template}, settings = ${settings}
            WHERE site_id = ${id}
            RETURNING *;`;

        if (result.length === 0) {
            return res.status(404).json({ error: "Site not found" });
        }
        return res.status(200).json({ message: "Site updated successfully", site: result[0] });
    } catch (error) {
        console.error("Error updating site:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Delete a site by ID
async function deleteSite(req, res) {
    const { id } = req.params;

    try {
        const result = await sql`DELETE FROM site WHERE site_id = ${id} RETURNING *;`;
        if (result.length === 0) {
            return res.status(404).json({ error: "Site not found" });
        }
        return res.status(200).json({ message: "Site deleted successfully" });
    } catch (error) {
        console.error("Error deleting site:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Export the functions
module.exports = {
    createSite,
    getAllSites,
    getSiteById,
    updateSite,
    deleteSite,
   // addDomainToSite,
};
