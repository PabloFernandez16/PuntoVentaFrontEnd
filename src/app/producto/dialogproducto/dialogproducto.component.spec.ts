import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogproductoComponent } from './dialogproducto.component';

describe('DialogproductoComponent', () => {
  let component: DialogproductoComponent;
  let fixture: ComponentFixture<DialogproductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogproductoComponent]
    });
    fixture = TestBed.createComponent(DialogproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
