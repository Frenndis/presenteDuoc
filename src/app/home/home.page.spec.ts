import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerStub = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerStub }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home-profesor when a professor logs in successfully', () => {
    const mockResponse = { id: 1, nombre: 'Juan Perez', tipoPerfil: 1 };

    // Simulamos la respuesta correcta del servicio
    authServiceSpy.login.and.returnValue(of(mockResponse));

    component.user = 'docente';
    component.password = 'password1';
    component.login();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home-profesor'], { queryParams: { nombre: mockResponse.nombre } });
  });

  it('should navigate to home-estudiante when a student logs in successfully', () => {
    const mockResponse = { id: 2, nombre: 'Luis Gonzalez', tipoPerfil: 2 };

    // Simulamos la respuesta correcta del servicio
    authServiceSpy.login.and.returnValue(of(mockResponse));

    component.user = 'alumno';
    component.password = 'password2';
    component.login();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home-estudiante'], { queryParams: { nombre: mockResponse.nombre } });
  });

  it('should show an alert when login fails', () => {
    spyOn(window, 'alert'); // Espía la función alert del navegador
    authServiceSpy.login.and.returnValue(throwError('Correo o contraseña incorrectos'));

    component.user = 'incorrecto';
    component.password = 'incorrecto';
    component.login();

    expect(window.alert).toHaveBeenCalledWith('Correo o contraseña incorrectos');
  });
});
