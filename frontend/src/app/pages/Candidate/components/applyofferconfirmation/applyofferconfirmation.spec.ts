import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Applyofferconfirmation } from './applyofferconfirmation';

describe('Applyofferconfirmation', () => {
  let component: Applyofferconfirmation;
  let fixture: ComponentFixture<Applyofferconfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Applyofferconfirmation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Applyofferconfirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
