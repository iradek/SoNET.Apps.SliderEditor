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
    oauth_client_id =  "8f10e303-e051-4ee0-822a-627f6471da73";
    oauth_client_secret = "OciYMVgGyxCvREXXy6cwNQ";
    siteName = "SampleSite";
    userName = "Admin";
    userPassword = "test123";
    passwordAlreadyEncrypted = false;
    oAuthGrant = OAuthGrant.ClientCredentials;
}