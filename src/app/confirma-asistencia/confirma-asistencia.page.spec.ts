import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmaAsistenciaPage } from './confirma-asistencia.page';

describe('ConfirmaAsistenciaPage', () => {
  let component: ConfirmaAsistenciaPage;
  let fixture: ComponentFixture<ConfirmaAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
