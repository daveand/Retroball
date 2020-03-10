import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroballComponent } from './retroball.component';

describe('RetroballComponent', () => {
  let component: RetroballComponent;
  let fixture: ComponentFixture<RetroballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetroballComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
