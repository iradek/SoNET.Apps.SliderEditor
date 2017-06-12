import { Component, ViewChild, ViewChildren, QueryList, ElementRef, OnChanges } from "@angular/core";
import { SliderApiClient } from "./services/sliderApiClient";
import { EditSlider } from "./edit-slider/editSlider";
import { Slider } from "./models/slider";
import { SliderItem } from "./models/sliderItem";
import { EditSliderItemComponent } from "./edit-slider-item/edit-slider-item.component";


@Component({
    selector: "sonet-sliderEditor",
    templateUrl: "./app.template.html"
})
export class AppComponent {

    @ViewChild("editSlider") editSliderControl: EditSlider;
    @ViewChild("slideEditor") slideEditor: ElementRef;
    @ViewChildren(EditSliderItemComponent) editSliderItemControls: QueryList<EditSliderItemComponent>;
    @ViewChildren("accordionHeader") accordionHeaders: QueryList<ElementRef>;

    name: string = "Slider Editor";
    width: number;

    get currentSlider(): Slider {
        return this.editSliderControl.getSliderObject();
    }
    set currentSlider(value: Slider) {
        this.editSliderControl.slider = value;
    }

    get canSave(): boolean {
        return this.editSliderControl!.valid;
    }

    constructor(private apiClient: SliderApiClient) {
    }

    async ngOnInit() {
        let currentSite = await this.apiClient.getSiteAsync();
        this.width = this.slideEditor.nativeElement.offsetWidth;
        if (currentSite && currentSite.SliderID)
            this.currentSlider = await this.apiClient.getSliderAsync(currentSite.SliderID); //from db            
    }

    async saveSlider() {
        if (!this.currentSlider)
            return;
        //save Slider
        let savedSlider = await this.apiClient.saveOrUpdateSliderAsync(this.currentSlider);
        //save Slider Items
        let index: number = 0;
        for (let editSliderControl of this.editSliderItemControls.toArray()) {
            if (!editSliderControl.valid)
                continue;
            let sliderItem = editSliderControl.getSliderItemObject();
            sliderItem.SliderID = savedSlider.SliderID;
            sliderItem.Order = index;
            var savedSliderItem = await this.apiClient.saveOrUpdateSliderItemAsync(sliderItem);
            let validSliderItemImageToUpload = editSliderControl.imagedata && editSliderControl.imagedata.image;
            if (validSliderItemImageToUpload)
                await this.apiClient.uploadSliderItemImageAsync(savedSliderItem.SliderItemID, editSliderControl.imagedata.image);
            index++;
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
        if (sliderItemID)
            await this.apiClient.deleteSliderItemAsync(sliderItemID);
    }

    addNewSliderItem() {
        let newSliderItem: SliderItem = new SliderItem();
        this.currentSlider.SliderItemList.push(newSliderItem);
        setTimeout(() => this.accordionHeaders!.last!.nativeElement!.click(), 100);//wait for rendering tick
    }

    trackSliderItem(index: number, sliderItem: SliderItem) {
        if (!sliderItem)
            return;
        return sliderItem.SliderItemID;
    }

}
