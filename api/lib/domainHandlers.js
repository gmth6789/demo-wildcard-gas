// lib/domainHandlers.js
export const addDomainToVercel = async (domain) => {
    return await fetch(
      `https://api.vercel.com/v10/projects/${
        process.env.PROJECT_ID_VERCEL
      }/domains${
        process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
      }`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: domain,
        }),
      }
    ).then((res) => res.json());
  };
  
  // Other functions remain the same as you've defined
  