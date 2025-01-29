import { IdentityProvider } from "samlify";
import fs from "fs";
import path from "path";

// Load your X.509 certificate from a file or environment variable
const idpCert = "commented this info out for deployment purposes..."; //fs.readFileSync(path.resolve(process.cwd(), 'private/idp-public-cert.pem'), 'utf8');

// Correct configuration for Identity Provider
const idp = IdentityProvider({
  entityID: "http://localhost/moodle", // Entity ID of your IdP
  singleSignOnService: [
    {
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect", // SSO binding type
      Location: "http://localhost:3100/auth/lms/signon", // SSO URL
    },
  ],
  singleLogoutService: [
    {
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect", // SLO binding type
      Location: "http://localhost:3100/auth/lms/signout", // SLO URL
    },
  ],
  signingCert: [idpCert], // An array of certificates for signing
});

export const generateIdpMetadata = (): string => idp.getMetadata();
