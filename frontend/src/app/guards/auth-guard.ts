import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.fetchUser().pipe(
    map(user => {
      if(user){
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    }),
    catchError(() => of(router.createUrlTree(['/login'])) )
  )
};
