import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmisorService {
  private emisorData = {compania: '', nombre: '', ruc: '' };

  constructor() {}

  updateEmisorData(data: any) {
    this.emisorData = data;
    localStorage.setItem('emisorData', JSON.stringify(data));
  }

  getEmisorData() {
    const storedData = localStorage.getItem('emisorData');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return this.emisorData;
  }

  clearEmisorData() {
    localStorage.removeItem('emisorData');
  }
  
}
