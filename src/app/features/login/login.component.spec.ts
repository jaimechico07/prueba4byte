import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([{ path: 'products', component: {} as any }]),
        AuthService,
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba 1: Campos vacíos
  it('debería mostrar error si username y password están vacíos', () => {
    const addSpy = vi.spyOn(messageService, 'add');

    component.username = '';
    component.password = '';

    component.onSubmit();

    expect(addSpy).toHaveBeenCalled();
  });

  // Prueba 2: Solo username vacío
  it('debería mostrar error si solo username está vacío', () => {
    const addSpy = vi.spyOn(messageService, 'add');

    component.username = '';
    component.password = '123456';

    component.onSubmit();

    expect(addSpy).toHaveBeenCalled();
  });

  // Prueba 3: Solo password vacío
  it('debería mostrar error si solo password está vacío', () => {
    const addSpy = vi.spyOn(messageService, 'add');

    component.username = 'testuser';
    component.password = '';

    component.onSubmit();

    expect(addSpy).toHaveBeenCalled();
  });

  // Prueba 4: Login exitoso
  it('debería navegar a /products si login es exitoso', async () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const loginSpy = vi.spyOn(authService, 'login').mockReturnValue(of({ token: 'fake-token' }));

    component.username = 'mor_2314';
    component.password = '83r5^_';

    component.onSubmit();

    expect(loginSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  });

  // Prueba 5: Login fallido (credenciales incorrectas)
  it('debería mostrar error si las credenciales son incorrectas', () => {
    const messageSpy = vi.spyOn(messageService, 'add');
    vi.spyOn(authService, 'login').mockReturnValue(throwError(() => new Error('Invalid')));

    component.username = 'mor_2314';
    component.password = 'wrong';

    component.onSubmit();

    expect(messageSpy).toHaveBeenCalled();
  });

  // Prueba 6: Loading state durante el login
  it('debería activar loading mientras se hace el login', () => {
    vi.spyOn(authService, 'login').mockReturnValue(of({ token: 'fake-token' }));

    component.username = 'mor_2314';
    component.password = '83r5^_';

    component.onSubmit();

    expect(component.loading()).toBe(true);
  });
});
