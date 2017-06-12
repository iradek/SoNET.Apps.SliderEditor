import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SliderItem } from "app/models/sliderItem";
import { ImageCropperComponent, CropperSettings, Bounds } from "ng2-img-cropper";
import { Slider } from "app/models/slider";
import { UrlService } from "sonet-appskit";

@Component({
    selector: 'sonet-edit-slider-item',
    templateUrl: './edit-slider-item.component.html',
    styleUrls: ['./edit-slider-item.component.css']
})
export class EditSliderItemComponent implements OnInit {

    imagedata: any = {};
    minWidth: number = 800; //adjust based min width of all templates
    defaultHeight: number = 300;
    editSliderItemForm: FormGroup;

    @Input()
    set sliderItem(value: SliderItem) {
        this._sliderItem = value;
        this.buildForm();
        this.fillControlFromInstance(value);
    }

    private _sliderItem: SliderItem;
    get sliderItem(): SliderItem {
        if (!this._sliderItem)
            this._sliderItem = new SliderItem();
        return this._sliderItem;
    }

    @Input()
    slider: Slider;

    @Input()
    width: number;

    private _cropperSettings: CropperSettings;
    get cropperSettings() {
        if (this._cropperSettings == null) {
            this._cropperSettings = new CropperSettings();
            this._cropperSettings.width = this.finalWidth;
            this._cropperSettings.height = this.slider ? this.slider.Height : this.defaultHeight;
            this._cropperSettings.croppedWidth = this.finalWidth;
            this._cropperSettings.croppedHeight = this.slider ? this.slider.Height : this.defaultHeight;
            this._cropperSettings.canvasWidth = this.finalWidth;
            this._cropperSettings.canvasHeight = this.slider ? this.slider.Height : this.defaultHeight;
        }
        return this._cropperSettings;
    }

    get valid(): boolean {
        return this.imgSource != null;
    }   

    get finalWidth(): number {
        return this.width > this.minWidth ? this.width : this.minWidth;
    }

    private _imgSource: string;
    get imgSource(): string {
        return this._imgSource ? this._imgSource : this.imagedata!.image;
    }
    set imgSource(value: string) {
        this._imgSource = value;
    }

    constructor(private formBuilder: FormBuilder, private urlService: UrlService) { }

    ngOnInit() {
        this.buildForm();
    }

    getSliderItemObject(): SliderItem {
        Object.assign(this.sliderItem, this.editSliderItemForm.value);
        return this.sliderItem;
    }

    // setSliderItemObject(sliderItem: SliderItem, order: number) {
    //     this.sliderItem = sliderItem;
    //     if (sliderItem)
    //         this.sliderItem.Order = order;
    // }

    buildForm(): void {
        this.editSliderItemForm = this.formBuilder.group({
            "TagTitle": [this.sliderItem.TagTitle, []],
            "TagMessage": [this.sliderItem.TagMessage, []],
            "ButtonText": [this.sliderItem.ButtonText, []],
            "ButtonUrl": [this.sliderItem.ButtonUrl, []]
        });
    }

    fillControlFromInstance(instance: SliderItem) {
        if (!instance)
            return;
        if (instance.ImagePath)
            this.imgSource = this.urlService.resolveFinalUrl(instance.ImagePath);
    }

    imgCropped(bounds: Bounds) {
        //fired also when new image is loaded for cropping
        this.imgSource = null;
    }

}
