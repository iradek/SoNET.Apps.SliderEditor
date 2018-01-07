import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { APP_INITIALIZER } from '@angular/core';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { XHRBackend, RequestOptions } from "@angular/http";
import { SharedModule } from "primeng/components/common/shared";
import { AccordionModule } from "primeng/components/accordion/accordion";
import { GrowlModule } from "primeng/components/growl/growl";
import { SliderModule } from "primeng/components/slider/slider";

import { SoNETAppsKitModule } from "sonet-appskit";
import { SoNetProxy } from "sonet-appskit"
import { SoNetOAuthService } from "sonet-appskit";
import { SoNetUrlService } from "sonet-appskit";
import { SoNetAppsConfig } from "sonet-appskit";
import { SoNetIntegrationService } from "sonet-appskit";
import { SoNetConfigService } from "sonet-appskit";

import { SliderApiClient } from "./services/sliderApiClient";
import { EditSlider } from "./edit-slider/editSlider";

import { AppComponent } from "./app.component";
import { EditSliderItemComponent } from './edit-slider-item/edit-slider-item.component';
import { ImageCropperComponent } from "ng2-img-cropper";
import { UtilsService } from "./services/utils.service";
import { Config } from "../apps.config";

@NgModule({
    imports: [BrowserModule, SoNETAppsKitModule, BrowserAnimationsModule, HttpModule, ReactiveFormsModule, FormsModule, AccordionModule, SharedModule, GrowlModule, SliderModule],
    declarations: [AppComponent, EditSlider, EditSliderItemComponent, ImageCropperComponent],
    providers: [
        SliderApiClient,
        SoNetOAuthService,
        SoNetUrlService,
        SoNetConfigService,        
        SoNetProxy,        
        //register custom SoNetAppsConfig which provides the settings from the code when you need to drive them dynamically
        {
            provide: SoNetAppsConfig,
            deps: [SoNetConfigService],
            useFactory: appsConfigFactory
        },
        //register configLoader to load the settings from a file; those override code-based SoNetAppsConfig settings when needed
        {
            provide: APP_INITIALIZER,
            useFactory: configLoader,
            deps: [SoNetConfigService],
            multi: true
        },
        UtilsService,      
    ],
    bootstrap: [AppComponent]
})
export class SliderEditorAppModule { }

//point the loader to a file with configuration settings
const configFilePath = 'assets/apps.config.json';
export function configLoader(configService: SoNetConfigService) {
    //Note: this factory needs to return a function that returns a promise
    return () => configService.loadAsync(configFilePath);
}
export function appsConfigFactory(configService: SoNetConfigService) {
    return new Config(configService);
}

