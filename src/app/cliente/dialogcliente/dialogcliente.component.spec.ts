import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogclienteComponent } from './dialogcliente.component';

describe('DialogclienteComponent', () => {
  let component: DialogclienteComponent;
  let fixture: ComponentFixture<DialogclienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogclienteComponent]
    });
    fixture = TestBed.createComponent(DialogclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
