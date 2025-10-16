import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnplashComponent } from './unplash.component';

describe('UnplashComponent', () => {
  let component: UnplashComponent;
  let fixture: ComponentFixture<UnplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnplashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
