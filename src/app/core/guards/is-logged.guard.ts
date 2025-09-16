import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _Platform = inject(PLATFORM_ID);


  if(isPlatformBrowser(_Platform) && localStorage.getItem('token')){ 
    return true;
  }
  else {
    router.navigate(['/signin']);
    return true;
  }
};
