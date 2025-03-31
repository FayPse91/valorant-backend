const axios = require('axios');

async function riotLogin(username, password) {
  const session = await axios.put("https://auth.riotgames.com/api/v1/authorization", {
    client_id: "play-valorant-web-prod",
    nonce: "1",
    redirect_uri: "https://playvalorant.com/opt_in",
    response_type: "token id_token",
    scope: "account openid",
  });

  const auth = await axios.put("https://auth.riotgames.com/api/v1/authorization", {
    type: "auth",
    username,
    password,
  });

  const uri = auth.data.response.parameters.uri;
  const access_token = uri.match(/access_token=([^&]+)/)[1];

  const ent = await axios.post("https://entitlements.auth.riotgames.com/api/token/v1", {}, {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  const user = await axios.post("https://auth.riotgames.com/userinfo", {}, {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  return {
    access_token,
    entitlement_token: ent.data.entitlements_token,
    puuid: user.data.sub,
    name: user.data.acct.game_name,
    tag: user.data.acct.tag_line,
  };
}

module.exports = { riotLogin };
