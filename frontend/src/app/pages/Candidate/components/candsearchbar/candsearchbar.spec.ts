import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Candsearchbar } from './candsearchbar';

describe('Candsearchbar', () => {
  let component: Candsearchbar;
  let fixture: ComponentFixture<Candsearchbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Candsearchbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Candsearchbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
