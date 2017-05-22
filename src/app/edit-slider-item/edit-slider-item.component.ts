import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SliderItem } from "app/models/sliderItem";

@Component({
  selector: 'sonet-edit-slider-item',
  templateUrl: './edit-slider-item.component.html',
  styleUrls: ['./edit-slider-item.component.css']
})
export class EditSliderItemComponent implements OnInit {
  
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
