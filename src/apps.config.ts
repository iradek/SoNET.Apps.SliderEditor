import { Injectable } from "@angular/core";
import { AppsConfig } from "sonet-appskit";
import { IntegrationService } from "sonet-appskit";
import { OAuthGrant } from "sonet-appskit";

@Injectable()
/**
 * Configure this SoNET Kit App here.
 */
export class Config implements AppsConfig {
    constructor(private integrationService: IntegrationService) {}
    api_baseUrl = "http://hpdesk:82";
    oauth_client_id =  "4012b7d1-359f-48ca-8d46-2349fe9c8370";
    oauth_client_secret = "jeLoQVhIK8FMuvCWEWRFdQ";
    siteName = "SampleSite";
    userName = "Admin";
    userPassword = "test123";
    passwordAlreadyEncrypted = false;
    oAuthGrant = OAuthGrant.ClientCredentials;
    logging = true;
}