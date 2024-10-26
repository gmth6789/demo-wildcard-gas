const fetch = require('node-fetch');

// Add domain to a Vercel project
async function addDomainToVercel(domain) {
  const response = await fetch(
    `https://api.vercel.com/v8/projects/${process.env.PROJECT_ID_VERCEL}/domains?teamId=${process.env.TEAM_ID_VERCEL}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: domain }),
    }
  );

  const data = await response.json();
  return { response, data };
}

// Remove domain from a Vercel project
async function removeDomainFromVercelProject(domain) {
  const response = await fetch(
    `https://api.vercel.com/v8/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  return { response, data };
}

// Remove domain from a Vercel team
async function removeDomainFromVercelTeam(domain) {
  const response = await fetch(
    `https://api.vercel.com/v8/teams/${process.env.TEAM_ID_VERCEL}/domains/${domain}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  return { response, data };
}

// Verify domain with Vercel
async function verifyDomain(domain) {
  const response = await fetch(
    `https://api.vercel.com/v8/domains/${domain}/verify`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  return { response, data };
}

// Get the subdomain information
async function getSubdomain(domain) {
  // Implement logic to retrieve subdomain info, if necessary
}

// Get the apex domain information
async function getApexDomain(domain) {
  // Implement logic to retrieve apex domain info, if necessary
}

// Validate the domain format
function validDomainRegex(domain) {
  const regex = /^(?!-)([A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,}$/; // Simple regex for domain validation
  return regex.test(domain);
}

// Get domain response (implement as needed)
async function getDomainResponse(domain) {
  // Implement logic to retrieve domain response, if necessary
}

// Get config response (implement as needed)
async function getConfigResponse() {
  // Implement logic to retrieve configuration response, if necessary
}

module.exports = {
  addDomainToVercel,
  removeDomainFromVercelProject,
  removeDomainFromVercelTeam,
  verifyDomain,
  getSubdomain,
  getApexDomain,
  validDomainRegex,
  getDomainResponse,
  getConfigResponse,
};
