import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centro-costos',
  templateUrl: './centro-costos.component.html',
  styleUrls: ['./centro-costos.component.css']
})
export class CentroCostosComponent {
  centroCostos: any[] = [];
  datosTablaOriginal: any[] = [];
  descripcionBusqueda: string = '';
  centroCostosBusqueda: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.fetchCentroCostos()
  }

  fetchCentroCostos(): void {
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('itemsPerPage', this.itemsPerPage.toString());
  
    this.http.get<any[]>('/api/Api/centroCostos', { params }).subscribe(
      data => {
        this.centroCostos = data;
        this.datosTablaOriginal = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  //CRUD CENTRO COSTOS
  nuevoCentroCostos() {
    Swal.fire({
      title: 'Añadir nuevo Centro de Costos',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Código" onkeypress="onlyNumbers(event)" maxlength="5">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Descripción" onkeypress="onlyLettersAndNumbers(event)">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      confirmButtonText: 'Crear',
      allowOutsideClick: () => !Swal.isLoading(),
      didOpen: () => {
        const input1 = document.getElementById('swal-input1') as HTMLInputElement;
        input1.addEventListener('keypress', this.onlyNumbers);
        
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        input2.addEventListener('keypress', this.onlyLettersAndNumbers);
      },
      preConfirm: () => {
        const codigo = (document.getElementById('swal-input1') as HTMLInputElement).value.toString().trim();
        const descripcion = (document.getElementById('swal-input2') as HTMLInputElement).value.trim();
        
        if (!codigo || !descripcion) {
          Swal.showValidationMessage('Ambos campos son requeridos');
          return false;
        }
        
        this.guardarNuevoCentroCostos(codigo, descripcion);
        return true; // Agregar esta línea
      },       
      willClose: () => {
        const input1 = document.getElementById('swal-input1') as HTMLInputElement;
        input1.removeEventListener('keypress', this.onlyNumbers);
        
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        input2.removeEventListener('keypress', this.onlyLettersAndNumbers);
      }
    });
  } 
  
  guardarNuevoCentroCostos(codigo: string, descripcion: string) {
    if (codigo && descripcion) {
      const url = `api/Api/centroCostos/insert?codigoCentroCostos=${codigo}&descripcionCentroCostos=${descripcion}`;
      const body = { codigoCentroCostos: codigo, descripcionCentroCostos: descripcion };
      this.http.post(url, body).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            title: 'Se ha ingresado exitosamente',
            icon: 'success',
            showCancelButton: false,
          }).then(() => {
            // Actualizar la tabla sin recargar la página
            this.fetchCentroCostos();
          });
        },
        (error) => {
          console.error(error);
          Swal.fire('¡Error!');
        }
      );
    }
  }

  editarCentroCostos(codigo: number): void {
    const centroCosto = this.centroCostos.find(cc => cc.Codigo === codigo);
  
    Swal.fire({
      title: 'Editar Centro de Costos',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Código" value="' + centroCosto.Codigo + '" readonly>' +
        '<input id="swal-input2" class="swal2-input" placeholder="Nombre Centro de Costos" value="' + centroCosto.NombreCentroCostos + '">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      allowOutsideClick: () => !Swal.isLoading(),
      didOpen: () => {
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        input2.addEventListener('keypress', this.onlyLettersAndNumbers);
      },
      preConfirm: () => {
        const codigo = parseInt((document.getElementById('swal-input1') as HTMLInputElement).value, 10);
        const nombreCentroCostos = (document.getElementById('swal-input2') as HTMLInputElement).value;
        if (!nombreCentroCostos) {
          Swal.showValidationMessage('El campo "Nombre Centro de Costos" es requerido');
          return false;
        }
        this.guardarCambiosCentroCostos(codigo, nombreCentroCostos);
        return true;
      },
      willClose: () => {
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        input2.removeEventListener('keypress', this.onlyLettersAndNumbers);
      }
    });
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

  getDescripcionCentroCostos(codigo: number): string {
    // Aquí haces una llamada al API para obtener el nombre del centro de costos con este código
    return this.centroCostos.find(cc => cc.Codigo === codigo)?.nombre || '';
  }

  guardarCambiosCentroCostos(codigo: number, nombre: string): void {
    const url = `/api/Api/centroCostos/update?codigoCentroCostos=${codigo}&descripcionCentroCostos=${nombre}`;
    const body = { codigoCentroCostos: codigo, descripcionCentroCostos: nombre };
    this.http.put(url, body).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          title: 'Cambios guardados',
          icon: 'success',
          showCancelButton: false,
        }).then(() => {
          this.fetchCentroCostos();
        });
      },
      (error) => {
        console.error(error);
        Swal.fire('Error al guardar los cambios', '', 'error');
      }
    );
  }

  eliminarCentroCostos(codigo: number, descripcion: string) {
    const params = new HttpParams()
      .set('codigocentrocostos', codigo.toString())
      .set('descripcioncentrocostos', descripcion);
  
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro que desea eliminar el centro de costos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete('api/Api/centroCostos/delete', { params }).subscribe(
          result => {
            console.log(result);
            Swal.fire('Se ha eliminado exitosamente').then(() => {
              this.fetchCentroCostos();
            });
          },
          error => {
            console.error(error);
            Swal.fire('Ocurrió un error al eliminar el centro de costos', '', 'error');
          }
        );
      }
    });
  }

  searchCentroCostos() {
    const descripcion = this.descripcionBusqueda;
    this.http.get<any[]>(`/api/Api/centroCostos/search?descripcioncentrocostos=${descripcion}`).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.centroCostos = data;
          this.currentPage = 1;
        } else {
          Swal.fire({
            icon: 'info',
            title: 'No se encontraron resultados',
            text: 'No se encontraron datos para la búsqueda realizada.',
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  limpiarBusqueda() {
    this.descripcionBusqueda = '';
    this.centroCostos = this.datosTablaOriginal;
  }

}
