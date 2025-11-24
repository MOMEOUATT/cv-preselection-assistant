import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableOffers } from './available-offers';

describe('AvailableOffers', () => {
  let component: AvailableOffers;
  let fixture: ComponentFixture<AvailableOffers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableOffers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableOffers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
