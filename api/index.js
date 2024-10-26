require('dotenv').config();

const fetch = require('node-fetch');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const { sql } = require('@vercel/postgres'); // Ensure this is actually needed
const path = require('path');

const {
  addDomainToVercel,
  removeDomainFromVercelProject,
  removeDomainFromVercelTeam,
  getDomainResponse,
  getConfigResponse,
  verifyDomain,
  getSubdomain,
  getApexDomain,
  validDomainRegex,
} = require('./lib/domainHandlers');

// Middleware setup
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // Body parser middleware for URL-encoded data

// Configure Nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// API endpoint to add a domain
app.get('/api/add-domain', async (req, res) => {
  const { domain, siteId } = req.query;

  // Ensure domain and siteId are provided
  if (!domain || !siteId) {
    return res.status(400).json({ error: "Domain and siteId are required." });
  }

  try {
    // Call Vercel API to add a domain
    const response = await fetch(
      `https://api.vercel.com/v8/projects/${process.env.PROJECT_ID_VERCEL}/domains?teamId=${process.env.TEAM_ID_VERCEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: domain }), // Use JSON.stringify for proper JSON format
      }
    );

    const data = await response.json();

    // Handle errors for forbidden or domain taken
    if (data.error) {
      if (data.error.code === "forbidden") {
        return res.status(403).json({ error: "Domain is already owned by another team." });
      } else if (data.error.code === "domain_taken") {
        return res.status(409).json({ error: "Domain is already being used by another project." });
      }
      // Handle other potential errors
      return res.status(response.status).json({ error: data.error.message });
    }

    // Retrieve the current site data using a database client (e.g., Turso)
    const { data: siteData } = await sql`
      SELECT * FROM site WHERE id = ${siteId};`; // Use your database query here

    // Check if the site was found
    if (!siteData.length) {
      return res.status(404).json({ error: "Site not found." });
    }

    // Update the database with the custom domain
    await sql`
      UPDATE site SET customDomain = ${domain} WHERE id = ${siteId};`; // Use your database query here

    return res.status(200).json({ message: "Domain added successfully." }); // Successfully updated
  } catch (error) {
    console.error("Error updating domain:", error);
    return res.status(500).json({ error: "Internal server error." }); // Handle database error
  }
});

// Example route to render a Nunjucks template
app.get('/', (req, res) => {
  res.render('index.njk', { title: 'Home Page' });
});

const PORT = 9000;

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));

module.exports = app;
