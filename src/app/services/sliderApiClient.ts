import { Injectable } from "@angular/core";
import { HttpProxy } from "sonet-appskit";
import { ApiClient } from "sonet-appskit";
import { Slider } from "../models/slider";
import { AppsConfig } from "sonet-appskit";

@Injectable()
export class SliderApiClient extends ApiClient {

    constructor(protected httpProxy: HttpProxy, protected appsConfig: AppsConfig) {
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

}