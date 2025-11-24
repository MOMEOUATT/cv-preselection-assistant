import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesCard } from './candidates-card';

describe('CandidatesCard', () => {
  let component: CandidatesCard;
  let fixture: ComponentFixture<CandidatesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
