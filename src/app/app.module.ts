import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from '@angular/forms';
import { XHRBackend, RequestOptions } from "@angular/http";
import { AccordionModule } from "primeng/components/accordion/accordion";

import { SoNETAppsKitModule } from "sonet-appskit";
import { HttpProxy } from "sonet-appskit"
import { OAuthService } from "sonet-appskit";
import { UrlService } from "sonet-appskit";
import { AppsConfig } from "sonet-appskit";
import { IntegrationService } from "sonet-appskit";

import { SliderApiClient } from "./services/sliderApiClient";
import { EditSlider } from "./controls/editSlider";

import { Config } from "../apps.config";
import { AppComponent } from "./app.component";

@NgModule({
    imports: [BrowserModule, SoNETAppsKitModule, BrowserAnimationsModule, HttpModule, ReactiveFormsModule, AccordionModule],
    declarations: [AppComponent, EditSlider],
    providers: [
        SliderApiClient,
        OAuthService,
        UrlService,
        Config,
        IntegrationService,
        {
            provide: AppsConfig,
            deps: [IntegrationService],
            useFactory: appsConfigFactory
        },
        {
            provide: HttpProxy,
            deps: [XHRBackend, RequestOptions, OAuthService, UrlService, Config],
            useFactory: httpProxyFactory
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function appsConfigFactory(integrationService: IntegrationService) {
    return new Config(integrationService);
}

export function httpProxyFactory(backend: XHRBackend, options: RequestOptions, oAuthService: OAuthService, urlService: UrlService) {
    return new HttpProxy(backend, options, oAuthService, urlService);
}

