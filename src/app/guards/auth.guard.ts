import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  const currUser = _AuthService.getCurrentUser();
  if (currUser.getValue() != null){return true}
  else{
    _Router.navigate(['/login'])
    return false;
  }
  
};


export const unAuthGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  const currUser = _AuthService.getCurrentUser();
  if (currUser.getValue() == null){return true}
  else{
    _Router.navigate(['/home'])
    return false;
  }
}