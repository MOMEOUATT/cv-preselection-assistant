import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureCard } from './candidature-card';

describe('CandidatureCard', () => {
  let component: CandidatureCard;
  let fixture: ComponentFixture<CandidatureCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatureCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatureCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
