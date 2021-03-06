import { SliderItem } from "./sliderItem";

export class Slider {
    Interval: number;
    Width: number;
    Height: number;
    SliderID: string;
    Disabled: boolean;
    ShowPrevNext: boolean;
    ShowSlideIndicators: boolean;
    CreatedTime: Date;
    SliderItemList : SliderItem[] = [];
}