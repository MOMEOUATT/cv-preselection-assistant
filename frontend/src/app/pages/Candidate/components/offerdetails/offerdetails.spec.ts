import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Offerdetails } from './offerdetails';

describe('Offerdetails', () => {
  let component: Offerdetails;
  let fixture: ComponentFixture<Offerdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Offerdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Offerdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
