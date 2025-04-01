const axios = require('axios');

async function authenticateRiot(username, password) {
  try {
    const authPayload = {
      "client_id": "play-valorant-web-prod",
      "nonce": "1",
      "redirect_uri": "https://playvalorant.com/opt_in",
      "response_type": "token id_token",
      "scope": "account openid"
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    // Step 1: Start auth session
    const authResponse = await axios.put('https://auth.riotgames.com/api/v1/authorization', {
      ...authPayload
    }, { headers });

    // Step 2: Send login data
    const loginResponse = await axios.put('https://auth.riotgames.com/api/v1/authorization', {
      ...authPayload,
      type: "auth",
      username,
      password
    }, { headers });

    if (loginResponse.data.error) {
      return { error: loginResponse.data.error };
    }

    const uri = loginResponse.data.response.parameters.uri;
    const access_token = uri.match(/access_token=([^&]*)/)[1];
    const id_token = uri.match(/id_token=([^&]*)/)[1];

    // Step 3: Get entitlement token
    const entRes = await axios.post("https://entitlements.auth.riotgames.com/api/token/v1", {}, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    const entitlements_token = entRes.data.entitlements_token;

    return {
      access_token,
      id_token,
      entitlements_token
    };

  } catch (err) {
    console.error("Erreur d'auth Riot:", err.message);
    return { error: "Auth failed" };
  }
}

module.exports = authenticateRiot;
