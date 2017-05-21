import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Slider } from "../models/slider";
import { ValidationService } from "sonet-appskit";

@Component({
    selector: "sonet-editSlider",
    inputs: [
    ],
    templateUrl: "./editSlider.html"
})
export class EditSlider implements OnInit {
    
    private _slider : Slider;

    get valid(): boolean  {
        return this.editSliderForm && this.editSliderForm.valid;
    }

    get slider(): Slider {
        if (!this._slider)
            this._slider = new Slider();
        return this._slider;
    }
    @Input()
    set slider(value: Slider) {
        this._slider = value;
        this.buildForm();
    }

    getSlider() : Slider {
        return this.editSliderForm.valid ? this.editSliderForm.value : null;
    }

    editSliderForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.slider.Disabled = false;
        this.slider.ShowPrevNext = true;
    }

    ngOnInit() {
        this.buildForm();
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
}