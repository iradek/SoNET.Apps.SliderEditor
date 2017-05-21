import { Component, ViewChild } from "@angular/core";
import { SliderApiClient } from "./services/sliderApiClient";
import { EditSlider } from "./edit-slider/editSlider";
import { Slider } from "app/models/slider";
import { SliderItem } from "app/models/sliderItem";


@Component({
  selector: "sonet-sliderEditor",
  templateUrl: "./app.template.html",
})
export class AppComponent {
  name: string = "Slider Editor";
  objectFromApi: string;
  get currentSlider(): Slider {
    return this.editSliderControl.getSlider();
  }

  @ViewChild("editSlider") editSliderControl: EditSlider

  constructor(private apiClient: SliderApiClient) {
  }

  async ngOnInit() {
    let currentSite = await this.apiClient.getSiteAsync();
    this.objectFromApi = currentSite;
    if (currentSite && currentSite.SliderID) {
      let slider = await this.apiClient.getSliderAsync(currentSite.SliderID);
    }
  }

  sliderSaved() {
    if (!this.currentSlider)
      return;
    let savedSlider = this.apiClient.saveSliderAsync(this.currentSlider);
  }

  addNew() {
    let newSliderItem: SliderItem = new SliderItem();
    this.currentSlider.SliderItemList.push(newSliderItem);
  }

}
