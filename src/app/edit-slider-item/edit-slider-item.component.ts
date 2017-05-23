import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SliderItem } from "app/models/sliderItem";
import { ImageCropperComponent, CropperSettings } from "ng2-img-cropper";

@Component({
  selector: 'sonet-edit-slider-item',
  templateUrl: './edit-slider-item.component.html',
  styleUrls: ['./edit-slider-item.component.css']
})
export class EditSliderItemComponent implements OnInit {
  
  imagedata: any = {};

  private _cropperSettings: CropperSettings;
  get cropperSettings() {
    if (this._cropperSettings == null) {
      this._cropperSettings = new CropperSettings();
      this._cropperSettings.width = 500;
      this._cropperSettings.height = 300;
      this._cropperSettings.croppedWidth = 500;
      this._cropperSettings.croppedHeight = 300;
      this._cropperSettings.canvasWidth = 500;
      this._cropperSettings.canvasHeight = 300;
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

  @Input()
  set sliderItem(value: SliderItem) {
    this._sliderItem = value;
    this.buildForm();
  }

  get valid() {
    return this.editSliderItemForm && this.editSliderItemForm.valid;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  getSliderItem(): SliderItem {
    Object.assign(this.sliderItem, this.editSliderItemForm.value);
    return this.sliderItem;
  }

  buildForm(): void {
    this.editSliderItemForm = this.formBuilder.group({
      "TagTitle": [this.sliderItem.TagTitle, [Validators.required]],
      "TagMessage": [this.sliderItem.TagMessage, []],
      "ButtonText": [this.sliderItem.ButtonText, []],
      "ButtonUrl": [this.sliderItem.ButtonText, []]
    });
  }

}
