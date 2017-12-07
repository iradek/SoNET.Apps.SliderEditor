import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { XHRBackend, RequestOptions } from "@angular/http";
import { SharedModule } from "primeng/components/common/shared";
import { AccordionModule } from "primeng/components/accordion/accordion";
import { GrowlModule } from 'primeng/components/growl/growl';

import { SoNETAppsKitModule } from "sonet-appskit";
import { SoNetProxy } from "sonet-appskit"
import { OAuthService } from "sonet-appskit";
import { UrlService } from "sonet-appskit";
import { AppsConfig } from "sonet-appskit";
import { IntegrationService } from "sonet-appskit";

import { SliderApiClient } from "./services/sliderApiClient";
import { EditSlider } from "./edit-slider/editSlider";

import { Config } from "../apps.config";
import { AppComponent } from "./app.component";
import { EditSliderItemComponent } from './edit-slider-item/edit-slider-item.component';
import { ImageCropperComponent } from "ng2-img-cropper";
import { UtilsService } from "./services/utils.service";

@NgModule({
    imports: [BrowserModule, SoNETAppsKitModule, BrowserAnimationsModule, HttpModule, ReactiveFormsModule, FormsModule, AccordionModule, SharedModule, GrowlModule],
    declarations: [AppComponent, EditSlider, EditSliderItemComponent, ImageCropperComponent],
    providers: [
        SliderApiClient,
        OAuthService,
        UrlService,
        Config,
        UtilsService,
        IntegrationService,
        {
            provide: AppsConfig,
            deps: [IntegrationService],
            useFactory: appsConfigFactory
        },
        {
            provide: SoNetProxy,
            deps: [XHRBackend, RequestOptions, OAuthService, UrlService, Config],
            useFactory: httpProxyFactory
        }
    ],
    bootstrap: [AppComponent]
})
export class SliderEditorAppModule { }

export function appsConfigFactory(integrationService: IntegrationService) {
    return new Config(integrationService);
}

export function httpProxyFactory(backend: XHRBackend, options: RequestOptions, oAuthService: OAuthService, urlService: UrlService, appsConfig: AppsConfig) {
    return new SoNetProxy(backend, options, oAuthService, urlService, appsConfig);
}

