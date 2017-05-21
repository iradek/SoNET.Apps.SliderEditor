import { Component, ViewChild } from "@angular/core";
import { SliderApiClient } from "./services/sliderApiClient";
import { EditSlider } from "./controls/editSlider";


@Component({
  selector: "sonet-sliderEditor",
  templateUrl: "./app.template.html",
})
export class AppComponent {
  name: string = "Slider Editor";
  objectFromApi: string;

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
    let slider = this.editSliderControl.getSlider();
    if (slider) {
      let savedSlider = this.apiClient.saveSliderAsync(slider);
    }
  }

}
