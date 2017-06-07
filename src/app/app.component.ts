import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from "@angular/core";
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

    @ViewChild("editSlider") editSliderControl: EditSlider;
    @ViewChild("slideEditor") slideEditor: ElementRef;
    @ViewChildren(EditSliderItemComponent) editSliderItemControls: QueryList<EditSliderItemComponent>;

    name: string = "Slider Editor";
    objectFromApi: string;
    width: number;

    //sliderItemList: SliderItem[] = [];

    get currentSlider(): Slider {
        return this.editSliderControl.getSliderObject();
    }
    set currentSlider(value: Slider) {
        this.editSliderControl.slider = value;
    }

    get canSave(): boolean {
        return this.editSliderControl && this.editSliderControl.valid && this.currentSlider && this.currentSlider.SliderItemList && this.currentSlider.SliderItemList.length > 0;
    }

    constructor(private apiClient: SliderApiClient) {
    }

    async ngOnInit() {
        let currentSite = await this.apiClient.getSiteAsync();
        this.objectFromApi = currentSite;

        this.width = this.slideEditor.nativeElement.offsetWidth;
        if (currentSite && currentSite.SliderID)
            this.currentSlider = await this.apiClient.getSliderAsync(currentSite.SliderID); //from db            
    }

    ngAfterViewInit() {

    }

    async saveSlider() {
        if (!this.currentSlider)
            return;
        //save Slider
        let savedSlider = await this.apiClient.saveOrUpdateSliderAsync(this.currentSlider);        
        //save Slider Items
        for (let editSliderControl of this.editSliderItemControls.toArray()) {
            let validSliderItemDataToSave = editSliderControl.imagedata && editSliderControl.imagedata.image;            
            if (validSliderItemDataToSave) {
                let sliderItem = editSliderControl.getSliderItemObject();
                sliderItem.SliderID = savedSlider.SliderID;                
                var savedSliderItem = await this.apiClient.saveOrUpdateSliderItemAsync(sliderItem);
                await this.apiClient.uploadSliderItemImageAsync(savedSliderItem.SliderItemID, editSliderControl.imagedata.image);
            }
        }
        //associate with a Site
        let currentSite = await this.apiClient.getSiteAsync();
        if (!currentSite)
            throw new Error("Current Site is null which is not supported while saving a Slider.");
        await this.apiClient.saveSliderForSiteAsync(currentSite.SiteName, savedSlider.SliderID);
    }

    async deleteSliderItem(index: number) {
        var sliderItemID = this.currentSlider.SliderItemList[index]!.SliderItemID;
        this.currentSlider.SliderItemList.splice(index, 1);        
        if(sliderItemID)
            await this.apiClient.deleteSliderItemAsync(sliderItemID);
    }

    addNewSliderItem() {
        let newSliderItem: SliderItem = new SliderItem();
        this.currentSlider.SliderItemList.push(newSliderItem);
    }

}
