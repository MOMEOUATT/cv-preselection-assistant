import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandOffers } from './cand-offers';

describe('CandOffers', () => {
  let component: CandOffers;
  let fixture: ComponentFixture<CandOffers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandOffers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandOffers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
