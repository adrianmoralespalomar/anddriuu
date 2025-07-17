/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HsrComponent } from './hsr.component';

describe('HsrComponent', () => {
  let component: HsrComponent;
  let fixture: ComponentFixture<HsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
