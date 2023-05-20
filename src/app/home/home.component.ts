import { Component, OnInit } from '@angular/core';
import { EmisorService } from '../shared/emisor.service';
import { DomSanitizer } from '@angular/platform-browser';  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emisorNombre = '';
  emisorRuc = '';
  logoUrl:any;
  centroCostos: any[] = [];
  datos: any;
  codigo: number | undefined;
  descripcion: string | undefined;
  apiResponse: any;
  busqueda: string = '';
  nombreBusqueda: string = '';
  mostrarFormularioCentroCostos = true;
  fechaActual: string;
  nombreUsuario: string = 'Desactivado';
  sesionIniciada: boolean = false;
  mostrarMovimientosPlanilla: boolean = false;
  mostrarTrabajadores: boolean = false;
  

  constructor(private emisorService: EmisorService,private sanitizer: DomSanitizer, private http: HttpClient,private router: Router) {
    this.logoUrl = this.sanitizer.bypassSecurityTrustUrl('assets/img/logo-taller.svg');  
    this.fechaActual = new Date().toLocaleDateString();
    const sesionGuardada = localStorage.getItem('sesionIniciada');
    this.sesionIniciada = sesionGuardada === 'true';
    const nombreUsuarioGuardado = localStorage.getItem('nombreUsuario');
    this.sesionIniciada = sesionGuardada === 'true';
    if (nombreUsuarioGuardado !== null) {
      this.nombreUsuario = nombreUsuarioGuardado;
    }    
   }

  ngOnInit(): void {
    const emisorData = this.emisorService.getEmisorData();
    this.emisorNombre = emisorData.nombre;
    this.emisorRuc = emisorData.ruc;
    window.onbeforeunload = () => {
      localStorage.setItem('sesionIniciada', this.sesionIniciada.toString());
    };
  }

  abrirVentanaLogin(origen: string): void {
    if (!this.sesionIniciada) {
      Swal.fire({
        title: 'Iniciar Sesión Autorizador',
        html:
          '<input id="swal-input-usuario" class="swal2-input" placeholder="Usuario" maxlength="3">' +
          '<input id="swal-input-password" class="swal2-input" placeholder="Contraseña" type="password" maxlength="5">',
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Iniciar Sesión',
        focusConfirm: false,
        didOpen: () => {
          const usuarioInput = document.getElementById('swal-input-usuario') as HTMLInputElement;
          usuarioInput.addEventListener('keypress', this.onlyNumbers);
  
          const passwordInput = document.getElementById('swal-input-password') as HTMLInputElement;
          passwordInput.addEventListener('keypress', this.onlyLettersAndNumbers);
        },
        preConfirm: () => {
          const usuarioInput = document.getElementById('swal-input-usuario') as HTMLInputElement;
          const usuario = usuarioInput.value.trim();
  
          // Validar el campo de usuario
          if (!usuario || usuario.length > 5) {
            Swal.showValidationMessage('El campo de usuario debe contener máximo 5 números');
            return false;
          }
  
          // Resto de la validación del campo de contraseña
          const passwordInput = document.getElementById('swal-input-password') as HTMLInputElement;
          const password = passwordInput.value.trim();
  
          // Validar el campo de contraseña
          if (!password || !/^[a-zA-Z0-9]+$/.test(password)) {
            Swal.showValidationMessage('El campo de contraseña solo permite letras y números');
            return false;
          }
  
          return true; // Devolver true si la validación es exitosa
        },
        willClose: () => {
          const usuarioInput = document.getElementById('swal-input-usuario') as HTMLInputElement;
          usuarioInput.removeEventListener('keypress', this.onlyNumbers);
  
          const passwordInput = document.getElementById('swal-input-password') as HTMLInputElement;
          passwordInput.removeEventListener('keypress', this.onlyLettersAndNumbers);
        }
        }).then((result) => {
        if (result.isConfirmed) {
          const usuario = (document.getElementById('swal-input-usuario') as HTMLInputElement).value;
          const password = (document.getElementById('swal-input-password') as HTMLInputElement).value;
  
          const endpoint = '/api/Api/loginAutorizador';
          const url = new URL(endpoint, window.location.origin);
    
          url.searchParams.append('usuario', usuario);
          url.searchParams.append('password', password);
    
          fetch(url.toString())
            .then(response => response.json())
            .then(responseObj => {
              if (responseObj[0].OBSERVACION === 'INGRESO EXITOSO') {
                Swal.fire({
                  icon: 'success',
                  title: '¡Inicio de sesión exitoso!',
                  text: 'Bienvenido al sistema.'
                });
                if (origen === 'CentroCostos') {
                  // Lógica específica para CentroCostos
                  this.mostrarFormularioCentroCostos = true;
                  this.mostrarMovimientosPlanilla = false;
                  this.mostrarTrabajadores = false;
                } else if (origen === 'MovimientoPlanilla') {
                  // Lógica específica para MovimientoPlanilla
                  this.mostrarMovimientosPlanilla = true;
                  this.mostrarFormularioCentroCostos = false;
                  this.mostrarTrabajadores = false;
                }
                else if (origen === 'Trabajadores') {
                  // Lógica específica para MovimientoPlanilla
                  this.mostrarTrabajadores = true;
                  this.mostrarFormularioCentroCostos = false;
                  this.mostrarMovimientosPlanilla = false;
                }
                this.nombreUsuario = responseObj[0].NOMBREUSUARIO;
                this.sesionIniciada = true;
                // Al iniciar sesión
                localStorage.setItem('sesionIniciada', 'true');
                localStorage.setItem('nombreUsuario', responseObj[0].NOMBREUSUARIO); // Reemplaza "nombreUsuario" con el valor real
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Inicio de sesión fallido',
                  text: 'Credenciales inválidas. Por favor, inténtalo de nuevo.'
                });
              }
            })
            .catch(error => {
              console.error('Error:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error durante el inicio de sesión. Por favor, inténtalo de nuevo.'
              });
            });
        }
      });
    }
  }

  Autorizador(): void {
    if (!this.sesionIniciada) {
      this.abrirVentanaLogin('CentroCostos');
    } else {
      // Aquí puedes colocar la lógica para mostrar el contenido del "Centro de Costos"
      this.mostrarFormularioCentroCostos = true;
      this.mostrarMovimientosPlanilla = false;
    }
  }

  CentroCostos(): void {
    
      // Aquí puedes colocar la lógica para mostrar el contenido del "Centro de Costos"
      this.mostrarFormularioCentroCostos = true;
      this.mostrarMovimientosPlanilla = false;
      this.mostrarTrabajadores = false;
  }

  MovimientoPlanilla(): void {
    
      // Aquí puedes colocar la lógica para mostrar el contenido del "Centro de Costos"
      this.mostrarMovimientosPlanilla = true;
      this.mostrarFormularioCentroCostos = false;
      this.mostrarTrabajadores = false;
    
  }

  Trabajadores(): void {
    
    // Aquí puedes colocar la lógica para mostrar el contenido del "Centro de Costos"
    this.mostrarTrabajadores = true;
    this.mostrarFormularioCentroCostos = false;
    this.mostrarMovimientosPlanilla = false;
  
}

  cerrarSesionAutorizador(): void {
    Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'La sesión de usuario ha sido cerrada.',
      timer: 2000, // Duración del mensaje en milisegundos
      timerProgressBar: true,
      showConfirmButton: false
    });
    this.sesionIniciada = false;
    this.nombreUsuario = 'Desactivado';
    this.mostrarFormularioCentroCostos = false;
    this.mostrarMovimientosPlanilla = false;
    this.mostrarTrabajadores = false;
    localStorage.setItem('nombreUsuario', 'Desactivado'); // Reemplaza "nombreUsuario" con el valor real
  }

  cerrarSesionAPP(){
    this.sesionIniciada = false;
    this.emisorService.clearEmisorData();  
    localStorage.removeItem('sesionIniciada');
    this.router.navigate(['/']);  
  }
  
  onlyLettersAndNumbers(event: KeyboardEvent): void {
    const input = event.key;
    const isLetterOrNumber = /^[a-zA-Z0-9]+$/.test(input);
    const isAllowedKey = event.code === 'Backspace' || event.code === 'Delete' || event.code === 'Tab' || event.code === 'Space';
  
    if (!isLetterOrNumber && !isAllowedKey) {
      event.preventDefault();
    }
  }
  
  onlyNumbers(event: KeyboardEvent): void {
    const input = event.key;
    const isNumber = /^[0-9]+$/.test(input);
    const isAllowedKey = event.code === 'Backspace' || event.code === 'Delete' || event.code === 'Tab';
  
    if (!isNumber && !isAllowedKey) {
      event.preventDefault();
    }
  }
  
}
