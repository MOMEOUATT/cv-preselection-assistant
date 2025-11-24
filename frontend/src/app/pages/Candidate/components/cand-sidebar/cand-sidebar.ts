import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../service/auth-service';

@Component({
  selector: 'app-cand-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './cand-sidebar.html',
  styleUrl: './cand-sidebar.css'
})
export class CandSidebar {

  activeLink: string = 'offers'; // Par défaut
  authService = inject(AuthService)

  setActive(link: string): void {
    //  this.router.navigate([link]);
    this.activeLink = link;
  }

  constructor(private router: Router) {}

forceReload() {
  this.router.navigateByUrl('/candidate/offers', { skipLocationChange: true }).then(() => {
    this.router.navigateByUrl('/candidate/offers');
  });
}

logout(){
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => console.log("Erreur lors de la déconnexion", err)
    });
  }

}
