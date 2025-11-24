import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deleteofferconfirmation } from './deleteofferconfirmation';

describe('Deleteofferconfirmation', () => {
  let component: Deleteofferconfirmation;
  let fixture: ComponentFixture<Deleteofferconfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deleteofferconfirmation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deleteofferconfirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
