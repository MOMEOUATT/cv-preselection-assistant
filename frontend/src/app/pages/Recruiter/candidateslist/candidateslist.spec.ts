import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Candidateslist } from './candidateslist';

describe('Candidateslist', () => {
  let component: Candidateslist;
  let fixture: ComponentFixture<Candidateslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Candidateslist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Candidateslist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
