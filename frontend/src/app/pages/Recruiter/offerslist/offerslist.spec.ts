import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Offerslist } from './offerslist';

describe('Offerslist', () => {
  let component: Offerslist;
  let fixture: ComponentFixture<Offerslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Offerslist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Offerslist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
