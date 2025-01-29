// lib/oidc.ts
import { AccessToken, IdToken, Provider } from "oidc-provider";
import jwt from "jsonwebtoken";

// OIDC clients configuration

const configuration = {
  clients: [
    {
      client_id: "moodle781uhui-client892kjjid-id832dhhw",
      client_secret: "moodle615hhsgs-client917sggsw-secret0012jsggsl",
      // redirect_uris: ['http://localhost:8080/auth/oidc/callback'],
      redirect_uri: [
        "https://moodletest.qverselearning.org/admin/oauth2callback.php",
      ],
      grant_types: ["authorization_code"],
      // response_types: ['basic'] as ResponseType[],// type ResponseType = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect"
      // + other client properties
    },
  ],
  formats: {
    // AccessToken: 'jwt'
    // AccessToken: 'jwt',
  },
  features: {
    introspection: { enabled: true },
    revocation: { enabled: true },
    userinfo: { enabled: true },
  },
};

// Initialize the OIDC provider instance
const oidcProvider = new Provider("http://localhost:3100", configuration);

export default oidcProvider;

// Function to issue JWT token
const issueToken = (userId: string, email: string) => {
  const payload = { userId, email };
  const secret = "your_secret_key";

  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

// Example usage inside your OIDC Provider
oidcProvider.on("authorization_code.grant", (ctx, token) => {
  const jwtToken = issueToken(
    ctx.oidc.entities.User.id,
    ctx.oidc.entities.User.email
  );
  ctx.oidc.entity("AccessToken").value = jwtToken;
});
