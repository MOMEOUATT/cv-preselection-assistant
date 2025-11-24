import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandSidebar } from './cand-sidebar';

describe('CandSidebar', () => {
  let component: CandSidebar;
  let fixture: ComponentFixture<CandSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
