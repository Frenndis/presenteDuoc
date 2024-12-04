import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', () => {
    const mockUser = { user: 'alumno', password: 'password2' };
    const mockResponse = { id: 2, nombre: 'Luis Gonzalez', tipoPerfil: 2 };

    service.login(mockUser.user, mockUser.password).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://k1cg7j8b-5000.brs.devtunnels.ms/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
