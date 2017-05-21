import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSliderItemComponent } from './edit-slider-item.component';

describe('EditSliderItemComponent', () => {
  let component: EditSliderItemComponent;
  let fixture: ComponentFixture<EditSliderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSliderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSliderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
