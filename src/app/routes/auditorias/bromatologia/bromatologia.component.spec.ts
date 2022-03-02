import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BromatologiaComponent } from './bromatologia.component';

describe('BromatologiaComponent', () => {
  let component: BromatologiaComponent;
  let fixture: ComponentFixture<BromatologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BromatologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BromatologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
