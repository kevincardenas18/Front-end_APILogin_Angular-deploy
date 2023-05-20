import { Injectable } from '@angular/core';  
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';  
import { Observable } from 'rxjs';  
import { EmisorService } from './shared/emisor.service';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class AuthGuard implements CanActivate {  
    
  constructor(private router: Router, private emisorService: EmisorService) {}  
    
  canActivate(  
    next: ActivatedRouteSnapshot,  
    state: RouterStateSnapshot): boolean {  
    const emisor = this.emisorService.getEmisorData();  
    if (emisor && emisor.OBSERVACION === 'INGRESO EXITOSO') { // Verifica que existe el atributo 'rol' y es igual a 'admin'  
      return true;  
    } else {  
      this.router.navigate(['/']);  
      return false;  
    }  
  }  
    
}  