import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersCard } from './offers-card';

describe('OffersCard', () => {
  let component: OffersCard;
  let fixture: ComponentFixture<OffersCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
