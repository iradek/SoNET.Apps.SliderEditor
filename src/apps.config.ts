import { Injectable } from "@angular/core";
import { SoNetAppsConfig } from "sonet-appskit";
import { SoNetIntegrationService } from "sonet-appskit";
import { OAuthGrant } from "sonet-appskit";
import { SoNetConfigService } from "sonet-appskit";

@Injectable()
/**
 * Configure this SoNET Apps Kit here.
 */
export class Config extends SoNetAppsConfig {
    /** Base url of installed SoNET engine against which you are issuing API calls. There are many SoNET engines already deployed throughout the world. An example would be: https://www.lpk7.com. You can always quickly install your own either on premise or in the cloud. Please refer to this link: http://www.iradek.com/Products/ */
    api_baseUrl = "";
    /** Your Client ID obtained by registering via http://store.iradek.com/Client/Register */
    oauth_client_id =  "";
    /** Your Client Secret obtained by registering via http://store.iradek.com/Client/Register */
    oauth_client_secret = "";
    /** Name of the Site when Site-level access is being requested. */
    siteName = "";
    /** Name of the user when ResourceOwner grant is used. */
    userName = "";
    /** User password when ResourceOwner grant is used. */
    userPassword = "";
    /** Whether the user password is already encrypted (ResourceOwner grant). */
    passwordAlreadyEncrypted = false;
    /** Supported OAuth grant type. Change it before API call to adjust oauth grant. With ClientCredentials grant you can call APIs that do not require Site user. With ResourceGrant credentials you call APIs that act on behalf of Site user. See http://[base url of SoNET]/api/help for more details.  */
    oAuthGrant = OAuthGrant.ClientCredentials;
    /** Whether to enable extra logging to a console that might help diagnose api calls made by this library */
    logging = false;
}