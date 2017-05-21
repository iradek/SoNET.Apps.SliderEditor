import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SliderItem } from "app/models/sliderItem";

@Component({
  selector: 'sonet-edit-slider-item',
  templateUrl: './edit-slider-item.component.html',
  styleUrls: ['./edit-slider-item.component.css']
})
export class EditSliderItemComponent implements OnInit {

  private _sliderItem: SliderItem;

  editSliderItemForm: FormGroup

  get sliderItem(): SliderItem {
    if (!this._sliderItem)
      this._sliderItem = new SliderItem();
    return this._sliderItem;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
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
