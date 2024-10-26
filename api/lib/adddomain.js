const fetch = require('node-fetch');

async function addDomain(domain) {
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

module.exports = {
    addDomain,
    // removeDomainFromVercelProject,
    // removeDomainFromVercelTeam,
    // verifyDomain,
    // getSubdomain,
    // getApexDomain,
    // validDomainRegex,
    // getDomainResponse,
    // getConfigResponse,
  };
  