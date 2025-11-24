import { Component, inject, OnInit, signal } from '@angular/core';
import { CandSidebar } from "../cand-sidebar/cand-sidebar";
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OfferService } from '../../../../service/offer-service';
import { Offersmodel } from '../../../../models/offersmodel';
import { CommonModule, DatePipe } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-offerdetails',
  imports: [CandSidebar, MatButtonModule, MatIconModule, MatChipsModule, MatCardModule, DatePipe, CommonModule],
  templateUrl: './offerdetails.html',
  styleUrl: './offerdetails.css'
})
export class Offerdetails implements OnInit{

  router = inject(Router);
  route = inject(ActivatedRoute);
  offerService = inject(OfferService);
  offers = signal<Offersmodel[]>([]);
  offer = new Offersmodel;

  offerId: number = 0;
  deadline: Date = new Date();
  today: Date = new Date();
  skills: string[] = [];
  languages: string[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Id = params.get('id');
      this.offerId = Number(Id);

      this.offerService.getOfferById(this.offerId).subscribe({
        next: (data) => {
          this.offer = data;
          this.deadline = new Date(this.offer.deadline);
          this.deadline.setHours(0,0,0,0);
          this.today.setHours(0,0,0,0);
          this.offer.status = this.deadline > this.today ? "active" : "inactive";
          this.skills = this.offer.skills ? this.offer.skills.split(',') : [];
          this.languages = this.offer.language ? this.offer.language.split(',') : [];
          //console.log(this.offer)
        },
        error: (err) => console.log("Erreur lors du chargement de l'offre: ", err)
      });
    });
    
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0,0);
      });

  }
  
  offerApply(id: number) {
    this.router.navigate(['/candidate/offers/apply',id])
  }

  turnBack(){
    this.router.navigate(["/candidate/offers"])
  }

}
