import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularOffers } from './popular-offers';

describe('PopularOffers', () => {
  let component: PopularOffers;
  let fixture: ComponentFixture<PopularOffers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularOffers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularOffers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
