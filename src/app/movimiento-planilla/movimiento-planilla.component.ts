import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-movimiento-planilla',
  templateUrl: './movimiento-planilla.component.html',
  styleUrls: ['./movimiento-planilla.component.css']
})
export class MovimientoPlanillaComponent {
  codigo: number | undefined;
  descripcion: string | undefined;
  apiResponse: any;
  movimientosPlanilla: any[] = [];
  movimientoExcepcion1Options: any[] = [];
  movimientoExcepcion2Options: any[] = [];
  movimientoExcepcion3Options: any[] = [];
  tipoOperacionOptions: any[] = [];
  trabaAfectaIESSOptions: any[] = [];
  trabAfecImpuestoRentaOptions: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  movimientosPlanillaBusqueda: any[] = [];
  conceptoBusqueda: string = '';
  datosTablaOriginal: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.fetchMovimientosPlanilla();

    this.http.get<any[]>('/api/Api/MovimientosExcepcion1y2')
    .pipe(
      map(data => data.map(item => ({
        value: item.DesripMovimientoExce, // Usar DesripMovimientoExce como valor
        label: item.CodigoMovimientoExce // Mostrar CodigoMovimientoExce en la interfaz
      })))
    )
    .subscribe(
      data => {
        this.movimientoExcepcion1Options = data;
        this.movimientoExcepcion2Options = data;
      },
        error => {
          console.log(error);
        }
      );

      this.http.get<any[]>('/api/Api/ObtenerMovimientosExcepcion3')
      .pipe(
        map(data => data.map(item => ({
          value: item.DesripMovimientoExce, // Usar DesripMovimientoExce como valor
          label: item.CodigoMovimientoExce // Mostrar CodigoMovimientoExce en la interfaz
        })))
      )
      .subscribe(
        data => {
          this.movimientoExcepcion3Options = data;
        },
        error => {
          console.log(error);
        }
      );

      this.http.get<any[]>('/api/Api/GetTipoOperacion')
      .pipe(
        map(data => data.map(item => ({
          value: item.NombreOperacion, // Usar DesripMovimientoExce como valor
          label: item.CodigoTipooperacion // Mostrar CodigoMovimientoExce en la interfaz
        })))
      )
      .subscribe(
        data => {
          this.tipoOperacionOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/GetTrabaAfectaIESS')
      .pipe(
        map(data => data.map(item => ({
          value: item.DesripMovimientoExce, // Usar DesripMovimientoExce como valor
          label: item.CodigoMovimientoExce // Mostrar CodigoMovimientoExce en la interfaz
        })))
      )
      .subscribe(
        data => {
          this.trabaAfectaIESSOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/GetTrabAfecImpuestoRenta')
      .pipe(
        map(data => data.map(item => ({
          value: item.DesripMovimientoExce, // Usar DesripMovimientoExce como valor
          label: item.CodigoMovimientoExce // Mostrar CodigoMovimientoExce en la interfaz
        })))
      )
      .subscribe(
        data => {
          this.trabAfecImpuestoRentaOptions = data;
        },
          error => {
            console.log(error);
          }
      );

  }

  fetchMovimientosPlanilla(): void {
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('itemsPerPage', this.itemsPerPage.toString());
  
    this.http.get<any[]>('/api/Api/movimientosPlanilla', { params }).subscribe(
      data => {
        this.movimientosPlanilla = data;
        this.datosTablaOriginal = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getOptionsMovimientoExcepcion1(): { value: string, label: string }[] {
    // Lógica para obtener las opciones del movimiento excepción 1
    return this.movimientoExcepcion1Options;
  }

  getOptionsMovimientoExcepcion2(): { value: string, label: string }[] {
    // Lógica para obtener las opciones del movimiento excepción 2
    return this.movimientoExcepcion2Options;
  }

  getOptionsMovimientoExcepcion3(): { value: string, label: string }[] {
    // Lógica para obtener las opciones del movimiento excepción 2
    return this.movimientoExcepcion3Options;
  }

  getOptionsTipoOperacion(): { value: string, label: string }[] {
    // Lógica para obtener las opciones del movimiento excepción 2
    return this.tipoOperacionOptions;
  }

  getOptionsTrabaAfectaIESS(): { value: string, label: string }[] {
    // Lógica para obtener las opciones del movimiento excepción 2
    return this.trabaAfectaIESSOptions;
  }

  getOptionsTrabAfecImpuestoRenta(): { value: string, label: string }[] {
    // Lógica para obtener las opciones del movimiento excepción 2
    return this.trabAfecImpuestoRentaOptions;
  }

  nuevoMovimientoPlanilla() {
    Swal.fire({
      title: 'Añadir nuevo Movimiento Planilla',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Concepto">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Prioridad" onkeypress="onlyNumbers(event)">' +
        '<select id="swal-input3" class="swal2-input">' +
        '<option value="">Tipo Operacion</option>' +
        this.getOptionsTipoOperacion().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
        '</select>' +
        '<input id="swal-input4" class="swal2-input" placeholder="Cuenta 1" onkeypress="onlyNumbers(event)">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Cuenta 2" onkeypress="onlyNumbers(event)">' +
        '<input id="swal-input6" class="swal2-input" placeholder="Cuenta 3" onkeypress="onlyNumbers(event)">' +
        '<input id="swal-input7" class="swal2-input" placeholder="Cuenta 4" onkeypress="onlyNumbers(event)">' +
        '<select id="swal-input8" class="swal2-input">' +
        '<option value="">movimiento exepcion 1</option>' +
        this.getOptionsMovimientoExcepcion1().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
        '</select>' +
        '<select id="swal-input9" class="swal2-input">' +
        '<option value="">movimiento exepcion 2</option>' +
        this.getOptionsMovimientoExcepcion2().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
        '</select>' +
        '<select id="swal-input10" class="swal2-input">' +
        '<option value="">movimiento exepcion 3</option>' +
        this.getOptionsMovimientoExcepcion3().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
        '</select>' +
        '<select id="swal-input11" class="swal2-input">' +
        '<option value="">Aplica IESS</option>' +
        this.getOptionsTrabaAfectaIESS().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
        '</select><br>' +
        '<select id="swal-input12" class="swal2-input">' +
        '<option value="">Aplica Impuesto renta</option>' +
        this.getOptionsTrabAfecImpuestoRenta().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
        '</select>' +
        // '<input id="swal-input13" class="swal2-input" placeholder="Aplica_Proy_Renta">' +
        '<select id="swal-input13" class="swal2-input">' +
        '<option value="">Aplica Proy Renta</option>' +
        this.getOptionsTrabAfecImpuestoRenta().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
        '</select><br>' +
        // '<input id="swal-input14" class="swal2-input" placeholder="Empresa_Afecta_Iess">',
        '<select id="swal-input14" class="swal2-input">' +
        '<option value="">Empresa Afecta IESS</option>' +
        this.getOptionsTrabaAfectaIESS().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
        '</select><br>',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      confirmButtonText: 'Crear',
      allowOutsideClick: () => !Swal.isLoading(),
      didOpen: () => {
        const inputs = [
          'swal-input2',
          'swal-input4',
          'swal-input5',
          'swal-input6',
          'swal-input7',
          'swal-input11',
          'swal-input12',
          'swal-input13',
          'swal-input14',
        ];
        inputs.forEach((inputId) => {
          const input = document.getElementById(inputId) as HTMLInputElement;
          input.addEventListener('keypress', this.onlyNumbers);
        });
      },
      preConfirm: () => {
        const concepto = (document.getElementById('swal-input1') as HTMLInputElement).value.trim();
        const prioridad = (document.getElementById('swal-input2') as HTMLInputElement).value.trim();
        const tipoOperacionSelect = document.getElementById('swal-input3') as HTMLSelectElement;
        const tipoOperacion = tipoOperacionSelect.value.trim();
        const cuenta1 = (document.getElementById('swal-input4') as HTMLInputElement).value.trim();
        const cuenta2 = (document.getElementById('swal-input5') as HTMLInputElement).value.trim();
        const cuenta3 = (document.getElementById('swal-input6') as HTMLInputElement).value.trim();
        const cuenta4 = (document.getElementById('swal-input7') as HTMLInputElement).value.trim();
        const movimientoExcepcion1Select = document.getElementById('swal-input8') as HTMLSelectElement;
        const movimientoExcepcion2Select = document.getElementById('swal-input9') as HTMLSelectElement;
        const movimientoExcepcion1 = movimientoExcepcion1Select.value.trim();
        const movimientoExcepcion2 = movimientoExcepcion2Select.value.trim();
        const movimientoExcepcion3Select = document.getElementById('swal-input10') as HTMLSelectElement;
        const movimientoExcepcion3 = movimientoExcepcion3Select.value.trim();
        const trabajaAplicaIessSelect = document.getElementById('swal-input11') as HTMLSelectElement;
        const Traba_Aplica_iess = trabajaAplicaIessSelect.value.trim();
        const trabajaProyectoImpRentaSelect = document.getElementById('swal-input12') as HTMLSelectElement;
        const Traba_Proyecto_imp_renta = trabajaProyectoImpRentaSelect.value.trim();
        const Aplica_Proy_RentaSelect = document.getElementById('swal-input13') as HTMLSelectElement;
        const Aplica_Proy_Renta = Aplica_Proy_RentaSelect.value.trim();
        const Empresa_Afecta_IessSelect = document.getElementById('swal-input14') as HTMLSelectElement;
        const Empresa_Afecta_Iess = Empresa_Afecta_IessSelect.value.trim();
        
        if (!concepto || !prioridad || !tipoOperacion || !cuenta1 || !cuenta2 || !cuenta3 || !cuenta4 || !movimientoExcepcion1 || !movimientoExcepcion2 || !movimientoExcepcion3 || !Traba_Aplica_iess || !Traba_Proyecto_imp_renta || !Aplica_Proy_Renta || !Empresa_Afecta_Iess) {
          Swal.showValidationMessage('Todos los campos son requeridos');
          return false;
        }
        
        this.guardarNuevoMovimientoPlanilla(
          concepto,
          prioridad,
          tipoOperacion,
          cuenta1,
          cuenta2,
          cuenta3,
          cuenta4,
          movimientoExcepcion1,
          movimientoExcepcion2,
          movimientoExcepcion3,
          Traba_Aplica_iess,
          Traba_Proyecto_imp_renta,
          Aplica_Proy_Renta,
          Empresa_Afecta_Iess
        );
        return true;
      },
      willClose: () => {
        const inputs = [
          'swal-input2',
          'swal-input4',
          'swal-input5',
          'swal-input6',
          'swal-input7',
          'swal-input11',
          'swal-input12',
          'swal-input13',
          'swal-input14',
        ];
        inputs.forEach((inputId) => {
          const input = document.getElementById(inputId) as HTMLInputElement;
          input.removeEventListener('keypress', this.onlyNumbers);
        });
      }
    });
  }
  
  guardarNuevoMovimientoPlanilla(
    concepto: string, prioridad: string, tipoOperacion: string, cuenta1: string, cuenta2: string, cuenta3: string, cuenta4: string,
    movimientoExcepcion1: string, movimientoExcepcion2: string, movimientoExcepcion3: string,
    trabajaAplicaIess: string, trabajaProyectoImpRenta: string, aplicaProyRenta: string, empresaAfectaIess: string
  ) {
    if (
      concepto && prioridad && tipoOperacion && cuenta1 && cuenta2 && cuenta3 && cuenta4 && movimientoExcepcion1 &&
      movimientoExcepcion2 && movimientoExcepcion3 && trabajaAplicaIess && trabajaProyectoImpRenta && aplicaProyRenta && empresaAfectaIess
    ) {
      const url = `/api/Api/movimientosPlanilla/insert?conceptos=${encodeURIComponent(concepto)}&prioridad=${encodeURIComponent(prioridad)}&tipoOperacion=${encodeURIComponent(tipoOperacion)}&cuenta1=${encodeURIComponent(cuenta1)}&cuenta2=${encodeURIComponent(cuenta2)}&cuenta3=${encodeURIComponent(cuenta3)}&cuenta4=${encodeURIComponent(cuenta4)}&movimientoExcepcion1=${encodeURIComponent(movimientoExcepcion1)}&movimientoExcepcion2=${encodeURIComponent(movimientoExcepcion2)}&movimientoExcepcion3=${encodeURIComponent(movimientoExcepcion3)}&Traba_Aplica_iess=${encodeURIComponent(trabajaAplicaIess)}&Traba_Proyecto_imp_renta=${encodeURIComponent(trabajaProyectoImpRenta)}&Aplica_Proy_Renta=${encodeURIComponent(aplicaProyRenta)}&Empresa_Afecta_Iess=${encodeURIComponent(empresaAfectaIess)}`;
  
      this.http.get(url).subscribe(
        () => {
          Swal.fire('Éxito', 'El movimiento de planilla se ha creado correctamente', 'success');
          this.fetchMovimientosPlanilla();
        },
        error => {
          console.log(error);
          Swal.fire('Error', 'Se produjo un error al crear el movimiento de planilla', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Todos los campos son requeridos', 'error');
    }
  }

  validarExcepciones1y2(movimientoExcepcionCodigo: string) {
    const excepciones = [
      { CodigoMovimientoExce: "Si Movimiento Planilla", DesripMovimientoExce: "M" },
      { CodigoMovimientoExce: "Horas Mov Planilla", DesripMovimientoExce: "H" },
      { CodigoMovimientoExce: "Cuenta Corriente ", DesripMovimientoExce: "C" },
    ];
  
    const validarCodigoExce = excepciones.find(item => item.CodigoMovimientoExce === movimientoExcepcionCodigo);
    if (validarCodigoExce) {
      return validarCodigoExce.DesripMovimientoExce;
    }
  
    return movimientoExcepcionCodigo;
  }

  validarAplica_iess(aplica_iessCodigo: string) {
    const opciones = [
      { CodigoMovimientoExce: "Si Aplica", DesripMovimientoExce: "1" },
      { CodigoMovimientoExce: "No Aplica", DesripMovimientoExce: "0" },
    ];
  
    const validarCodigoAplica_iess = opciones.find(item => item.CodigoMovimientoExce === aplica_iessCodigo);
    if (validarCodigoAplica_iess) {
      return validarCodigoAplica_iess.DesripMovimientoExce;
    }
  
    return aplica_iessCodigo;
  }

  validarAplica_imp_renta(aplica_imp_rentaCodigo: string) {
    const opciones = [
      { CodigoMovimientoExce: "Si Aplica", DesripMovimientoExce: "1" },
      { CodigoMovimientoExce: "No Aplica", DesripMovimientoExce: "0" },
    ];
  
    const validarCodigoAplica_imp_renta = opciones.find(item => item.CodigoMovimientoExce === aplica_imp_rentaCodigo);
    if (validarCodigoAplica_imp_renta) {
      return validarCodigoAplica_imp_renta.DesripMovimientoExce;
    }
  
    return aplica_imp_rentaCodigo;
  }
  

  editarMovimientoPlanilla(codigo: number): void {
    const movimientoPlanilla = this.movimientosPlanilla.find(cc => cc.CodigoConcepto === codigo);
    const tipoOperacionSeleccionada = movimientoPlanilla.TipoOperacion+'s';
    const movimientoExcepcion3 = movimientoPlanilla.MovimientoExcepcion3;
    
    Swal.fire({
      title: 'Editar Planilla',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Código Planilla" value="' + movimientoPlanilla.CodigoConcepto + '" readonly>' +
        '<input id="swal-input2" class="swal2-input" placeholder="Concepto" value="'+ movimientoPlanilla.Concepto + '">'+
        '<input id="swal-input3" class="swal2-input" placeholder="Prioridad" onkeypress="onlyNumbers(event)" + value="'+movimientoPlanilla.Prioridad+'">' +
        '<select id="swal-input4" class="swal2-input">' +
        '<option value="">Tipo Operacion</option>' +
        this.getOptionsTipoOperacion().map(option => `<option value="${option.value}" ${option.label === tipoOperacionSeleccionada ? "selected" : ""}>${option.label}</option>`).join('') +
        '</select>'+
        '<input id="swal-input5" class="swal2-input" placeholder="Cuenta 1" value="'+ movimientoPlanilla.Cuenta1 + '" onkeypress="onlyNumbers(event)">'+
        '<input id="swal-input6" class="swal2-input" placeholder="Cuenta 2" value="'+ movimientoPlanilla.Cuenta2 + '" onkeypress="onlyNumbers(event)">' +
        '<input id="swal-input7" class="swal2-input" placeholder="Cuenta 3" value="'+ movimientoPlanilla.Cuenta3 + '" onkeypress="onlyNumbers(event)">' +
        '<input id="swal-input8" class="swal2-input" placeholder="Cuenta 4" value="'+ movimientoPlanilla.Cuenta4 + '" onkeypress="onlyNumbers(event)">' +
        '<select id="swal-input9" class="swal2-input">' +
        '<option value="">movimiento exepcion 1</option>' +
        this.getOptionsMovimientoExcepcion1().map(option => `<option value="${option.value}" ${option.value === this.validarExcepciones1y2(movimientoPlanilla.MovimientoExcepcion1) ? "selected" : ""}>${option.label}</option>`).join('') +
        '</select>' +
        '<select id="swal-input10" class="swal2-input">' +
        '<option value="">movimiento exepcion 2</option>' +
        this.getOptionsMovimientoExcepcion2().map(option => `<option value="${option.value}" ${option.value === this.validarExcepciones1y2(movimientoPlanilla.MovimientoExcepcion2) ? "selected" : ""}>${option.label}</option>`).join('') +
        '</select>' +
        '<select id="swal-input11" class="swal2-input">' +
        '<option value="">movimiento exepcion 3</option>' +
        this.getOptionsMovimientoExcepcion3().map(option => `<option value="${option.value}" ${option.label === movimientoExcepcion3 ? "selected" : ""}>${option.label}</option>`).join('') +
        '</select>' +
        '<select id="swal-input12" class="swal2-input">' +
        '<option value="">Aplica IESS</option>' +
        this.getOptionsTrabaAfectaIESS().map(option => `<option value="${option.value}" ${option.value === this.validarAplica_iess(movimientoPlanilla.Aplica_iess) ? "selected" : ""}>${option.label}</option>`).join('') +
        '</select><br>' +
        '<select id="swal-input13" class="swal2-input">' +
        '<option value="">Aplica Impuesto renta</option>' +
        this.getOptionsTrabAfecImpuestoRenta().map(option => `<option value="${option.value}" ${option.value === this.validarAplica_imp_renta(movimientoPlanilla.Aplica_imp_renta) ? "selected" : ""}>${option.label}</option>`).join('') +
        '</select>' +
        // '<input id="swal-input13" class="swal2-input" placeholder="Aplica_Proy_Renta">' +
        '<select id="swal-input14" class="swal2-input">' +
        '<option value="">Aplica Proy Renta</option>' +
        this.getOptionsTrabAfecImpuestoRenta().map(option => `<option value="${option.value}" ${option.value === this.validarAplica_imp_renta(movimientoPlanilla.Aplica_imp_renta) ? "selected" : ""}>${option.label}</option>`).join('') +
        '</select><br>' +
        // '<input id="swal-input14" class="swal2-input" placeholder="Empresa_Afecta_Iess">',
        '<select id="swal-input15" class="swal2-input">' +
        '<option value="">Empresa Afecta IESS</option>' +
        this.getOptionsTrabaAfectaIESS().map(option => `<option value="${option.value}" ${option.value === this.validarAplica_iess(movimientoPlanilla.Empresa_Afecta_Iess) ? "selected" : ""}>${option.label}</option>`).join('') +
        '</select><br>',

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
        const codigoPlanilla = parseInt((document.getElementById('swal-input1') as HTMLInputElement).value, 10);
        const conceptos = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const prioridad = parseInt((document.getElementById('swal-input3') as HTMLInputElement).value, 10);
        const tipoOperacion = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const cuenta1 = parseInt((document.getElementById('swal-input5') as HTMLInputElement).value, 10);
        const cuenta2 = parseInt((document.getElementById('swal-input6') as HTMLInputElement).value, 10);
        const cuenta3 = parseInt((document.getElementById('swal-input7') as HTMLInputElement).value, 10);
        const cuenta4 = parseInt((document.getElementById('swal-input8') as HTMLInputElement).value, 10);
        const MovimientoExcepcion1 = (document.getElementById('swal-input9') as HTMLInputElement).value;
        const MovimientoExcepcion2 = (document.getElementById('swal-input10') as HTMLInputElement).value;
        const MovimientoExcepcion3 = (document.getElementById('swal-input11') as HTMLInputElement).value;
        const Traba_Aplica_iess = parseInt((document.getElementById('swal-input12') as HTMLInputElement).value, 10);
        const Traba_Proyecto_imp_renta = parseInt((document.getElementById('swal-input13') as HTMLInputElement).value, 10);
        const Aplica_Proy_Renta = parseInt((document.getElementById('swal-input14') as HTMLInputElement).value, 10);
        const Empresa_Afecta_Iess = parseInt((document.getElementById('swal-input15') as HTMLInputElement).value, 10);

        if (conceptos && prioridad && tipoOperacion && cuenta1 && cuenta2 && cuenta3 && cuenta4 && MovimientoExcepcion1 
          && MovimientoExcepcion2 && MovimientoExcepcion3 && Traba_Aplica_iess && Traba_Proyecto_imp_renta && Aplica_Proy_Renta && Empresa_Afecta_Iess) {
          Swal.showValidationMessage('Todos los campos son requeridos');
          return false;
        }
        this.guardarCambiosMovimientoPlanilla(codigoPlanilla,conceptos,prioridad,tipoOperacion,cuenta1,cuenta2,cuenta3,cuenta4
          ,MovimientoExcepcion1,MovimientoExcepcion2,MovimientoExcepcion3,Traba_Aplica_iess,Traba_Proyecto_imp_renta
          ,Aplica_Proy_Renta,Empresa_Afecta_Iess);
        return true;
      },
      willClose: () => {
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        input2.removeEventListener('keypress', this.onlyLettersAndNumbers);
      }
    });
  }

  guardarCambiosMovimientoPlanilla(codigoPlanilla: number, conceptos: string, prioridad: number, tipooperacion: string
    ,cuenta1: number,cuenta2: number,cuenta3: number,cuenta4: number, MovimientoExcepcion1: string,MovimientoExcepcion2: string,MovimientoExcepcion3: string,Traba_Aplica_iess: number,Traba_Proyecto_imp_renta: number
    ,Aplica_Proy_Renta: number,Empresa_Afecta_Iess: number): void {
    const url = `/api/Api/movimientosPlanilla/update?codigoplanilla=${codigoPlanilla}&conceptos=${conceptos}&prioridad=${prioridad}&tipooperacion=${tipooperacion}&cuenta1=${cuenta1}&cuenta2=${cuenta2}&cuenta3=${cuenta3}&cuenta4=${cuenta4}&MovimientoExcepcion1=${MovimientoExcepcion1}&MovimientoExcepcion2=${MovimientoExcepcion2}&MovimientoExcepcion3=${MovimientoExcepcion3}&Traba_Aplica_iess=${Traba_Aplica_iess}&Traba_Proyecto_imp_renta=${Traba_Proyecto_imp_renta}&Aplica_Proy_Renta=${Aplica_Proy_Renta}&Empresa_Afecta_Iess=${Empresa_Afecta_Iess}`;
    this.http.get(url).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          title: 'Cambios guardados',
          icon: 'success',
          showCancelButton: false,
        }).then(() => {
          this.fetchMovimientosPlanilla();
        });
      },
      (error) => {
        console.error(error);
        Swal.fire('Error al guardar los cambios', '', 'error');
      }
    );
  }


    eliminarMovimientoPlanilla(codigo: number, descripcion: string) {
      const params = new HttpParams()
        .set('codigomovimiento', codigo.toString())
        .set('descripcionomovimiento', descripcion);
    
      Swal.fire({
        title: 'Confirmación',
        text: '¿Está seguro que desea eliminar el movimiento de planilla?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.get('/api/Api/movimientosPlanilla/delete', { params }).subscribe(
            result => {
              // console.log(result);
              Swal.fire('Se ha eliminado exitosamente').then(() => {
                // Realizar acciones adicionales después de eliminar
                this.fetchMovimientosPlanilla()
              });
            },
            error => {
              console.error(error);
              Swal.fire('Ocurrió un error al eliminar al intentar eliminar la planilla', '', 'error');
            }
          );
        }
      });
    }

    searchMovimientoPlanilla() {
      const concepto = this.conceptoBusqueda;
      this.http.get<any[]>(`/api/Api/movimientosPlanilla/search?concepto=${concepto}`).subscribe(
        (data) => {
          if (data && data.length > 0) {
            this.movimientosPlanilla = data;
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
      this.conceptoBusqueda = '';
      this.movimientosPlanilla = this.datosTablaOriginal;
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