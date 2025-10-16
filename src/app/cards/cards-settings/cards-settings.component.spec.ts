import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsSettingsComponent } from './cards-settings.component';

describe('CardsSettingsComponent', () => {
  let component: CardsSettingsComponent;
  let fixture: ComponentFixture<CardsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
