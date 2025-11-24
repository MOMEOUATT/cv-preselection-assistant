import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCandidates } from './recent-candidates';

describe('RecentCandidates', () => {
  let component: RecentCandidates;
  let fixture: ComponentFixture<RecentCandidates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentCandidates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentCandidates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
