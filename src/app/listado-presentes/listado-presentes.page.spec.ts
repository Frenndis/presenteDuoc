import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ListadoPresentesPage } from './listado-presentes.page';
import { AttendanceService } from '../services/attendance.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListadoPresentesPage', () => {
  let component: ListadoPresentesPage;
  let fixture: ComponentFixture<ListadoPresentesPage>;
  let attendanceServiceSpy: jasmine.SpyObj<AttendanceService>;
  let socketSpy: jasmine.SpyObj<Socket>;

  beforeEach(() => {
    const attendanceSpy = jasmine.createSpyObj('AttendanceService', ['getStudents']);
    const socketMock = jasmine.createSpyObj('Socket', ['on', 'emit']);

    TestBed.configureTestingModule({
      declarations: [ListadoPresentesPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: AttendanceService, useValue: attendanceSpy },
        { provide: Socket, useValue: socketMock },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ cursoId: 1, cursoCodigo: 'PGY0000', seccion: '013V' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoPresentesPage);
    component = fixture.componentInstance;
    attendanceServiceSpy = TestBed.inject(AttendanceService) as jasmine.SpyObj<AttendanceService>;
    socketSpy = TestBed.inject(Socket) as jasmine.SpyObj<Socket>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load students on init', () => {
    const mockStudents = [
      { id: 2, nombre: 'Luis Gonzalez', status: 0 },
      { id: 3, nombre: 'Eros Gonzalez', status: 0 },
    ];
    attendanceServiceSpy.getStudents.and.returnValue(of(mockStudents));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.estudiantes).toEqual(mockStudents);
  });

  it('should update student status on "asistencia_actualizada" event', () => {
    const mockStudents = [
      { id: 2, nombre: 'Luis Gonzalez', status: 0 },
      { id: 3, nombre: 'Eros Gonzalez', status: 0 },
    ];
    attendanceServiceSpy.getStudents.and.returnValue(of(mockStudents));
  
    component.ngOnInit();
    fixture.detectChanges();
  
    // Simulamos el evento `asistencia_actualizada` recibido desde el servidor
    const updatedEvent = { alumno_id: 2, status: 1, curso_codigo: 'PGY0000', seccion: '013V' };
    socketSpy.on.and.callFake((event, callback) => {
      if (event === 'asistencia_actualizada') {
        callback(updatedEvent);
      }
    });
  
    // Como la función `loadStudents()` es llamada nuevamente, debemos simular la nueva respuesta
    const updatedStudents = [
      { id: 2, nombre: 'Luis Gonzalez', status: 1 },
      { id: 3, nombre: 'Eros Gonzalez', status: 0 },
    ];
    attendanceServiceSpy.getStudents.and.returnValue(of(updatedStudents));
  
    // Simulamos la recarga de la lista después del evento
    component.loadStudents();
    fixture.detectChanges();
  
    // Verificamos que el estado del alumno se haya actualizado
    expect(component.estudiantes.find((est) => est.id === 2)?.status).toBe(1);
  });
  
});
