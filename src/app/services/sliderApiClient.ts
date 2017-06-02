import { Injectable } from "@angular/core";
import { HttpProxy } from "sonet-appskit";
import { ApiClient } from "sonet-appskit";
import { Slider } from "../models/slider";
import { AppsConfig } from "sonet-appskit";
import { SliderItem } from "app/models/sliderItem";
import { UtilsService } from "app/services/utils.service";

@Injectable()
export class SliderApiClient extends ApiClient {

    constructor(protected httpProxy: HttpProxy, protected appsConfig: AppsConfig, private utilsService: UtilsService) {
        super(httpProxy, appsConfig);
    }

    async getSliderAsync(sliderID: string): Promise<Slider> {
        if (!sliderID)
            throw new Error("Invalid sliderID");
        return await this.httpProxy.getAsync<Slider>(`/odata/sliders(${sliderID})`);
    }

    async saveSliderAsync(slider: Slider): Promise<Slider> {
        if (!slider)
            throw new Error("Invalid Slider to save.");
        return await this.httpProxy.postAsync<Slider>("/odata/Sliders", slider);
    }

    async saveSliderItemAsync(sliderItem: SliderItem): Promise<SliderItem> {
        if (!sliderItem)
            throw new Error("Invalid SliderItem to save.");
        return await this.httpProxy.postAsync<SliderItem>("/odata/SliderItems", sliderItem);
    }

    async uploadSliderItemImageAsync(sliderItemID: string, imageDataUri: string): Promise<SliderItem> {
        let url = `/odata/SliderItems(${sliderItemID})/SoNET.UploadImage`;
        let imageBlob = this.utilsService.dataURItoBlob(imageDataUri);
        let formData: FormData = new FormData();        
        formData.append("file", imageBlob, "slideimage");
        formData.append("SiteName", this.appsConfig.siteName)
        return await this.httpProxy.postAsync<SliderItem>(url, formData);
    }    
}