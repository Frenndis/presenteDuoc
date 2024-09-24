import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoPresentesPage } from './listado-presentes.page';

describe('ListadoPresentesPage', () => {
  let component: ListadoPresentesPage;
  let fixture: ComponentFixture<ListadoPresentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPresentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
