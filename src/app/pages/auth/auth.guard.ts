// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token'); // مثال

  if (!isLoggedIn) {
    router.navigate(['/sign']); // يرجع لصفحة تسجيل الدخول
    return false;
  }
  return true;
};