import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomeEstudiantePage } from './home-estudiante.page';
import { AttendanceService } from '../services/attendance.service';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('HomeEstudiantePage', () => {
  let component: HomeEstudiantePage;
  let fixture: ComponentFixture<HomeEstudiantePage>;
  let attendanceServiceSpy: jasmine.SpyObj<AttendanceService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Creamos spies de los servicios
    const attendanceSpy = jasmine.createSpyObj('AttendanceService', ['getCursosAlumno']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    // Configuramos el módulo de pruebas
    TestBed.configureTestingModule({
      declarations: [HomeEstudiantePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AttendanceService, useValue: attendanceSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpyObj }
      ],
    }).compileComponents();

    // Creamos la instancia del componente
    fixture = TestBed.createComponent(HomeEstudiantePage);
    component = fixture.componentInstance;

    // Inyectamos los spies de los servicios
    attendanceServiceSpy = TestBed.inject(AttendanceService) as jasmine.SpyObj<AttendanceService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Detectamos cambios después de crear la instancia del componente
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
