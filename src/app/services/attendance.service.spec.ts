import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AttendanceService } from './attendance.service';

describe('AttendanceService', () => {
  let service: AttendanceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AttendanceService],
    });
    service = TestBed.inject(AttendanceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve courses for a student', () => {
    // Datos simulados que esperamos recibir de la API
    const mockCursos = [
      { id: 1, nombre: 'Matemáticas', codigo: 'PGY0000', seccion: '013V' },
      { id: 2, nombre: 'Fisica', codigo: 'PGY0001', seccion: '015V' },
    ];
    
    // Llamamos al método del servicio y verificamos que devuelva los datos esperados
    service.getCursosAlumno(2).subscribe((cursos) => {
      expect(cursos).toEqual(mockCursos);
    });

    // Verificamos que se haya hecho una solicitud GET a la URL correcta
    const req = httpMock.expectOne('https://k1cg7j8b-5000.brs.devtunnels.ms/alumnos/2/cursos');
    expect(req.request.method).toBe('GET');
    req.flush(mockCursos); // Simulamos la respuesta con los datos de mockCursos
  });

  it('should mark a student as present', () => {
    // Respuesta simulada de la API cuando la asistencia es registrada
    const mockResponse = { message: 'Asistencia registrada' };
    
    // Llamamos al método del servicio para marcar asistencia
    service.markAsPresent(2, 'PGY0000', '013V').subscribe((res) => {
      expect(res.message).toBe('Asistencia registrada');
    });

    // Verificamos que se haya hecho una solicitud POST a la URL correcta
    const req = httpMock.expectOne('https://k1cg7j8b-5000.brs.devtunnels.ms/registrar_asistencia');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      alumno_id: 2,
      codigo: 'PGY0000',
      seccion: '013V',
    });
    req.flush(mockResponse); // Simulamos la respuesta con los datos de mockResponse
  });
});
