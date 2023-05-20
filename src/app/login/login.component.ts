import { Component } from '@angular/core';
import { EmisorService } from '../shared/emisor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';  
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  emisores: any;
  selectedEmisor: string;
  mensajeError: any;
  username!: string;  
  password!: string; 
  emisorComp: any; 
  logoUrl:any;
   
  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private emisorService: EmisorService,private router: Router) { 
    this.selectedEmisor= '';
    this.logoUrl = this.sanitizer.bypassSecurityTrustUrl('assets/img/logo-taller.svg');  
  }


 

  onlyNumbers(event: KeyboardEvent) {
    const input = event.key;
    const isNumber = /^[0-9]+$/.test(input);
    const isAllowedKey = event.code === 'Backspace' || event.code === 'Delete' || event.code === 'Tab';
  
    if (!isNumber && !isAllowedKey) {
      event.preventDefault();
    }
  }
  
  


  ngOnInit() {
    this.http.get<any>('http://deploymetodologia.somee.com/api/Api/emisores')
      .subscribe((data: any[]) => {
        this.emisores = data.map(emisor => {
          return {
            NombreEmisor: emisor.NombreEmisor,
            Codigo: emisor.Codigo
          };
        });
        console.log(this.emisores); 
      });
      
  }
  

  onChangeEmisor(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    const emisorNombre = target.options[selectedIndex].value;
    console.log('Nombre del emisor seleccionado:', emisorNombre);
    this.emisorComp = emisorNombre;
  }
  
  onSubmit() {


    if (!this.username || !this.password || !this.emisorComp) {
      Swal.fire('¡Usuario o Contraseña incorrecta!');
      return;
    }
    else{
      const loginData = {
        usuario: this.username,
        contrasena: this.password
      };
      
      
      this.http.post('http://deploymetodologia.somee.com//api/Api/login', loginData)
        .subscribe(response => {
          
        const data = JSON.stringify(response);
        const responseObj = JSON.parse(data);
          
        const emisorData = {
        compania: responseObj[0].COMPANIA,
        nombre: responseObj[0].NOMBREEMISOR.trim(),
        ruc: responseObj[0].RucUsuario,
      };
      if (this.emisorComp === emisorData.nombre) {
        Swal.fire('¡Ingreso exitoso!');
        this.emisorService.updateEmisorData(emisorData);
        this.router.navigate(['/home']); // aquí se navega a la ruta /home
  
      } else {
        // mostrar mensaje de error o hacer otra acción
        Swal.fire('¡Emisor incorrecto!');
        
      }
  
  
        }, error => {
          console.log(error);
          Swal.fire('¡Error!');
        });
    }
    
  }
  
}