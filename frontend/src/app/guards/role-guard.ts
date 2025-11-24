import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { catchError, map, of } from 'rxjs';
import { isJSDocProtectedTag } from 'typescript';
import { User } from '../models/usermodel';

export const roleGuard = (expectedRole: string): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    let user = new User()

    return auth.fetchUser().pipe(
      map(data => {
        if (!data) {
          return router.createUrlTree(['/login']);
        }
        user = data
        return user.role === expectedRole
          ? true
          : router.createUrlTree(['/unauthorized']); 
      }),
      catchError(() => of(router.createUrlTree(['/login'])))
    );
  };
};