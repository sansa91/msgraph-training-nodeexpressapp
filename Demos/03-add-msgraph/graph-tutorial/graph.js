var graph = require('@microsoft/microsoft-graph-client');

module.exports = {
  getUserDetails: async function(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const user = await client.api('/me').get();
    return user;
  },

  getEvents: async function(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const events = await client
      .api('/me/events')
      // .api('/sites?search=*')
      .select('subject,organizer,start,end')
      .orderby('createdDateTime DESC')
      .get();

    return events;
  },
   getSites: async function(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const sites = await client
      .api('/sites?search=*')
      .select('siteCollection,displayName,webUrl,createdDateTime')
      .orderby('createdDateTime DESC')
      .get();

    return sites;
  }
};

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}