import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmisorService } from 'src/app/shared/emisor.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';  
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajadores-select',
  templateUrl: './trabajadores-select.component.html',
  styleUrls: ['./trabajadores-select.component.css']
})
export class TrabajadoresSelectComponent {

  trabajadores: any[] = [];
  datosTablaOriginal: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  emisorSeleccionado: any;
  mensaje: any = "";
  mensaje2: any = "";
  
  
  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private emisorService: EmisorService,private router: Router) {
    
  } 


  ngOnInit() {
    this.fetchTrabajadores()
  }


  fetchTrabajadores(): void {
    const codigoEmisorSeleccionado = this.emisorService.getEmisorData().compania;
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('itemsPerPage', this.itemsPerPage.toString());
  
    this.http.get<any[]>(`/api/Api/trabajador/select?sucursal=${codigoEmisorSeleccionado}`).subscribe(
      data => {
        this.trabajadores = data;
        this.datosTablaOriginal = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
