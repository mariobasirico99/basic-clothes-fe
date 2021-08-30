import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenditeComponent } from './vendite.component';

describe('VenditeComponent', () => {
  let component: VenditeComponent;
  let fixture: ComponentFixture<VenditeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenditeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
