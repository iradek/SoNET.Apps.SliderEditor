import { Component, ViewChild, ViewChildren, QueryList } from "@angular/core";
import { SliderApiClient } from "./services/sliderApiClient";
import { EditSlider } from "./edit-slider/editSlider";
import { Slider } from "app/models/slider";
import { SliderItem } from "app/models/sliderItem";
import { EditSliderItemComponent } from "app/edit-slider-item/edit-slider-item.component";


@Component({
  selector: "sonet-sliderEditor",
  templateUrl: "./app.template.html"
})
export class AppComponent {
  name: string = "Slider Editor";
  objectFromApi: string;

  sliderItemList: SliderItem[] = [];

  get currentSlider(): Slider {
    return this.editSliderControl.getSlider();
  }

  get canSave(): boolean {
    return this.editSliderControl && this.editSliderControl.valid && this.sliderItemList.length > 0;
  }

  @ViewChild("editSlider") editSliderControl: EditSlider;
  @ViewChildren(EditSliderItemComponent) editSliderItemControls: QueryList<EditSliderItemComponent>;

  constructor(private apiClient: SliderApiClient) {
  }

  async ngOnInit() {
    let currentSite = await this.apiClient.getSiteAsync();
    this.objectFromApi = currentSite;
    if (currentSite && currentSite.SliderID) {
      let slider = await this.apiClient.getSliderAsync(currentSite.SliderID);
    }
  }

  ngAfterViewInit() {

  }

  saveSlider() {
    if (!this.currentSlider)
      return;
    let savedSlider = this.apiClient.saveSliderAsync(this.currentSlider);
    for (let editSliderControl of this.editSliderItemControls.toArray()) {
      let sliderItem = editSliderControl.getSliderItem();
      console.log(sliderItem);
    }
  }

  deleteSliderItem(index: number) {
    this.sliderItemList.splice(index, 1);
  }

  addNewSliderItem() {
    let newSliderItem: SliderItem = new SliderItem();
    this.sliderItemList.push(newSliderItem);
  }

}
