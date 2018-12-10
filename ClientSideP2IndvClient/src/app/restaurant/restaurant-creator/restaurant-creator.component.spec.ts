import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCreatorComponent } from './restaurant-creator.component';

describe('RestaurantCreatorComponent', () => {
  let component: RestaurantCreatorComponent;
  let fixture: ComponentFixture<RestaurantCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
