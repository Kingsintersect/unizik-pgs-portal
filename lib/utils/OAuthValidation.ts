import { clientConfig } from "../../config/authconstants";

// Function to validate redirect URI
export function validateRedirectUri(clientId: string, redirectUri: string): boolean {
   const client = clientConfig.find((client) => client.clientId === clientId);
   if (!client) return false;

   return client.redirectUris.includes(redirectUri);
}