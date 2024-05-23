import { google } from "googleapis";
import { config } from "../config";

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
const GOOGLE_CLIENT_ID = config.googleClientID;
const GOOGLE_CLIENT_SECRET = config.googleClientSecret;

export default new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "postmessage");
