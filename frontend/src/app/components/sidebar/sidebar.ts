import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  router = inject(Router);
  authService = inject(AuthService);

  activeLink: string = 'home'; // Par défaut

  setActive(link: string): void {
    //  this.router.navigate([link]);
    this.activeLink = link;
  }

  logout(){
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => console.log("Erreur lors de la déconnexion", err)
    });
  }

}
