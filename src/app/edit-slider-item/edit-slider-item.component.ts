import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SliderItem } from "app/models/sliderItem";
import { ImageCropperComponent, CropperSettings } from "ng2-img-cropper";
import { Slider } from "app/models/slider";

@Component({
    selector: 'sonet-edit-slider-item',
    templateUrl: './edit-slider-item.component.html',
    styleUrls: ['./edit-slider-item.component.css']
})
export class EditSliderItemComponent implements OnInit {

    imagedata: any = {};
    minWidth: number = 800; //adjust based min width of all templates
    defaultHeight: number = 300;

    @Input()
    set sliderItem(value: SliderItem) {
        this._sliderItem = value;
        this.buildForm();
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

    editSliderItemForm: FormGroup

    private _sliderItem: SliderItem;
    get sliderItem(): SliderItem {
        if (!this._sliderItem)
            this._sliderItem = new SliderItem();
        return this._sliderItem;
    }

    get valid() {
        return this.imagedata && this.imagedata.image;
    }

    get finalWidth() {
        return this.width > this.minWidth ? this.width : this.minWidth;
    }

    get imgSource() {
        return (this.imagedata && this.imagedata.image) ? this.imagedata.image : null;
    }

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.buildForm();
    }

    getSliderItemObject(): SliderItem {
        Object.assign(this.sliderItem, this.editSliderItemForm.value);
        return this.sliderItem;
    }

    buildForm(): void {
        this.editSliderItemForm = this.formBuilder.group({
            "TagTitle": [this.sliderItem.TagTitle, []],
            "TagMessage": [this.sliderItem.TagMessage, []],
            "ButtonText": [this.sliderItem.ButtonText, []],
            "ButtonUrl": [this.sliderItem.ButtonText, []]
        });
    }

}
