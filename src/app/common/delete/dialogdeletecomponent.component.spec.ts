import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogdeletecomponentComponent } from './dialogdeletecomponent.component';

describe('DialogdeletecomponentComponent', () => {
  let component: DialogdeletecomponentComponent;
  let fixture: ComponentFixture<DialogdeletecomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogdeletecomponentComponent]
    });
    fixture = TestBed.createComponent(DialogdeletecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
