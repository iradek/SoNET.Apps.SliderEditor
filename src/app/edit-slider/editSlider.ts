import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Slider } from "../models/slider";
import { ValidationService } from "sonet-appskit";
import { SliderItem } from "app/models/sliderItem";

@Component({
    selector: "sonet-editSlider",
    templateUrl: "./editSlider.html"
})
export class EditSlider implements OnInit {

    private _slider: Slider;

    @Input()
    sliderItemList: SliderItem[] = [];

    get slider(): Slider {
        if (!this._slider) {
            this._slider = new Slider();
            //some default values
            this._slider.Height = 300;
            this._slider.Interval = 3;
        }
        return this._slider;
    }
    @Input()
    set slider(value: Slider) {
        this._slider = value;
        this.buildForm();
        this.fillControlFromInstance(value);
    }

    getSliderObject(): Slider {
        if (this.editSliderForm)
            Object.assign(this.slider, this.editSliderForm.value);
        return this.slider;
    }

    get valid(): boolean {
        return this.editSliderForm && this.editSliderForm.valid;
    }

    get canChangeHeight(): boolean {
        return !this.sliderItemList || !this.sliderItemList.length || this.sliderItemList.length === 0;
    }

    editSliderForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.slider.Disabled = false;
        this.slider.ShowPrevNext = true;
    }

    ngOnInit() {
        this.buildForm();
    }

    ngAfterViewInit() {
    }

    buildForm(): void {
        this.editSliderForm = this.formBuilder.group({
            "Disabled": [this.slider.Disabled || false, [Validators.required]],
            "Height": [this.slider.Height, [Validators.required, Validators.minLength(1), Validators.maxLength(4), ValidationService.invalidNumber]],
            "Interval": [this.slider.Interval, [Validators.required, Validators.minLength(1), Validators.maxLength(5), ValidationService.invalidNumber]],
            "ShowPrevNext": [this.slider.ShowPrevNext || false, [Validators.required]],
            "ShowSlideIndicators": [this.slider.ShowSlideIndicators || false, [Validators.required]]
        });
    }

    fillControlFromInstance(instance: Slider) {
        if (!instance)
            return;                    
    }
}