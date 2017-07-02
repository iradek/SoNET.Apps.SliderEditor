import { Injectable } from "@angular/core";
import { SoNetProxy } from "sonet-appskit";
import { ApiClient } from "sonet-appskit";
import { Slider } from "../models/slider";
import { AppsConfig } from "sonet-appskit";
import { SliderItem } from "../models/sliderItem";
import { UtilsService } from "./utils.service";

@Injectable()
export class SliderApiClient extends ApiClient {

    constructor(protected soNetProxy: SoNetProxy, protected appsConfig: AppsConfig, private utilsService: UtilsService) {
        super(soNetProxy, appsConfig);
    }

    async getSliderAsync(sliderID: string): Promise<Slider> {
        if (!sliderID)
            throw new Error("Invalid sliderID");
        return await this.soNetProxy.getAsync<Slider>(`/odata/Sliders(${sliderID})?$expand=SliderItemList`);
    }

    async saveSliderAsync(slider: Slider): Promise<Slider> {
        if (!slider)
            throw new Error("Invalid Slider to save.");
        var clonedSlider = Object.assign({}, slider);
        delete clonedSlider.SliderItemList;
        return await this.soNetProxy.postAsync<Slider>("/odata/Sliders", clonedSlider);
    }

    async updateSliderAsync(slider: Slider): Promise<Slider> {
        if (!slider)
            throw new Error("Invalid Slider to update");
        if (!slider.SliderID)
            throw new Error("Slider does not have SliderID therefore does not qualify to be updated.");
        var clonedSlider = Object.assign({}, slider);
        delete clonedSlider.SliderItemList;
        return await this.soNetProxy.putAsync<Slider>(`/odata/Sliders(${slider.SliderID})`, clonedSlider);
    }

    async saveOrUpdateSliderAsync(slider: Slider): Promise<Slider> {
        if (!slider)
            throw new Error("Invalid Slider to save or update");
        let objectSaved = slider.SliderID;
        if (objectSaved)
            return await this.updateSliderAsync(slider);
        else
            return await this.saveSliderAsync(slider);
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
        return await this.soNetProxy.patchAsync(url, body);
    }

    async saveSliderItemAsync(sliderItem: SliderItem): Promise<SliderItem> {
        if (!sliderItem)
            throw new Error("Invalid SliderItem to save.");
        return await this.soNetProxy.postAsync<SliderItem>("/odata/SliderItems", sliderItem);
    }

    async updateSliderItemAsync(sliderItem: SliderItem): Promise<SliderItem> {
        if (!sliderItem)
            throw new Error("Invalid SliderItem to update");
        if (!sliderItem.SliderItemID)
            throw new Error("SliderItem does not have a valid SliderItemID therefore does not qualify to be updated");
        return await this.soNetProxy.putAsync<SliderItem>(`/odata/SliderItems(${sliderItem.SliderItemID})`, sliderItem);
    }

    async saveOrUpdateSliderItemAsync(sliderItem: SliderItem): Promise<SliderItem> {
        if (!sliderItem)
            throw new Error("Invalid SliderItem to save or update.");
        let objectSaved = sliderItem.SliderItemID;
        if (objectSaved)
            return await this.updateSliderItemAsync(sliderItem);
        else
            return await this.saveSliderItemAsync(sliderItem);
    }

    async uploadSliderItemImageAsync(sliderItemID: string, imageDataUri: string): Promise<SliderItem> {
        let url = `/odata/SliderItems(${sliderItemID})/SoNET.UploadImage`;
        let imageBlob = this.utilsService.dataURItoBlob(imageDataUri);
        let formData: FormData = new FormData();
        formData.append("file", imageBlob, "slideimage");
        formData.append("SiteName", this.appsConfig.siteName)
        return await this.soNetProxy.postAsync<SliderItem>(url, formData);
    }

    async deleteSliderItemAsync(sliderItemID: string): Promise<SliderItem> {
        if (!sliderItemID)
            throw new Error("Invalid SliderItemID while deleting SliderItem");
        var url = `/odata/SliderItems(${sliderItemID})`;
        return await this.soNetProxy.deleteAsync<SliderItem>(url);
    }
}