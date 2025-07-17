/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ZzzComponent } from './zzz.component';

describe('ZzzComponent', () => {
  let component: ZzzComponent;
  let fixture: ComponentFixture<ZzzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZzzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZzzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
