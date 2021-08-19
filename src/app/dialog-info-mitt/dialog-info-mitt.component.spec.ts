import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfoMittComponent } from './dialog-info-mitt.component';

describe('DialogInfoMittComponent', () => {
  let component: DialogInfoMittComponent;
  let fixture: ComponentFixture<DialogInfoMittComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInfoMittComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInfoMittComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
