import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomeProfesorPage } from './home-profesor.page';
import { AttendanceService } from '../services/attendance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeProfesorPage', () => {
  let component: HomeProfesorPage;
  let fixture: ComponentFixture<HomeProfesorPage>;
  let attendanceServiceSpy: jasmine.SpyObj<AttendanceService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AttendanceService', ['getCursos']);

    TestBed.configureTestingModule({
      declarations: [HomeProfesorPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: AttendanceService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ nombre: 'Juan Pérez', id: 1 }) // Mock de parámetros de consulta
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeProfesorPage);
    component = fixture.componentInstance;
    attendanceServiceSpy = TestBed.inject(AttendanceService) as jasmine.SpyObj<AttendanceService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses for professor on init', () => {
    const mockCursos = [{ id: 1, nombre: 'Matemáticas', seccion: '013V' }];
    attendanceServiceSpy.getCursos.and.returnValue(of(mockCursos));

    // Manualmente llamar ngOnInit para ejecutar la lógica de inicialización
    component.ngOnInit();
    fixture.detectChanges(); // Detectar los cambios en la vista

    expect(component.cursos).toEqual(mockCursos);
  });

  it('should navigate to listado-presentes when selecting a course', () => {
    spyOn(component['router'], 'navigate');
    const cursoId = 1;

    component.seleccionarCurso(cursoId);

    expect(component['router'].navigate).toHaveBeenCalledWith(['/listado-presentes'], { queryParams: { cursoId } });
  });
});
