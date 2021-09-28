import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditStarshipComponent } from './modal-edit-starship.component';

describe('ModalEditStarshipComponent', () => {
  let component: ModalEditStarshipComponent;
  let fixture: ComponentFixture<ModalEditStarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditStarshipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditStarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
