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
        return await this.httpProxy.getAsync<Slider>(`/odata/Sliders(${sliderID})?$expand=SliderItemList`);
    }

    async saveSliderAsync(slider: Slider): Promise<Slider> {
        if (!slider)
            throw new Error("Invalid Slider to save.");
        delete slider.SliderItemList; //SliderItems are saved separately
        return await this.httpProxy.postAsync<Slider>("/odata/Sliders", slider);
    }

    async updateSliderAsync(slider: Slider): Promise<Slider> {
        if (!slider)
            throw new Error("Invalid Slider to update");
        if (!slider.SliderID)
            throw new Error("Slider does not have SliderID therefore does not qualify to be updated.");
        delete slider.SliderItemList;
        return await this.httpProxy.putAsync<Slider>(`/odata/Sliders(${slider.SliderID})`, slider);
    }

    async updateOrSaveSliderAsync(slider: Slider): Promise<Slider> {
        if (!slider)
            throw new Error("Invalid Slider to save or update");
        let objectSaved = slider.SliderID;
        if (objectSaved)
            return this.updateSliderAsync(slider);
        else
            return this.saveSliderAsync(slider);
    }

    /**
     * Saves unique ID of the Slider to a Site represented by SiteName.
     * @param siteName Unique ID/name of the Site to which associate SliderID.
     * @param sliderID Unique ID of the Slider which to associate with a Site.
     */
    async saveSliderForSiteAsync(siteName: string, sliderID: string) {
        if (!siteName)
            throw new Error("Invalid siteName while saving Slide for Site");
        if (!sliderID)
            throw new Error("Invalid sliderID while saving Slide for Site");
        let url = `/odata/Sites('${siteName}')`;
        let body = { "SliderID": sliderID };
        return await this.httpProxy.patchAsync(url, body);
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