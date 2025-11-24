import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { Sidebar } from "../../../components/sidebar/sidebar";
import { Searchbar } from "../components/searchbar/searchbar";
import { OffersCard } from "../components/offers-card/offers-card";
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router } from '@angular/router';
import { Offersmodel } from '../../../models/offersmodel';
import { OfferService } from '../../../service/offer-service';
import { ApplicationService } from '../../../service/application-service';
import { CandidatureModel } from '../../../models/candidature';
import { ApplicationModel } from '../../../models/applicationmodel';
import { filter } from 'rxjs';


@Component({
  selector: 'app-offerslist',
  imports: [OffersCard, Sidebar, Searchbar, MatButtonModule],
  templateUrl: './offerslist.html',
  styleUrl: './offerslist.css'
})
export class Offerslist implements OnInit {

  offers = signal<Offersmodel[]>([]) ;
  applys = signal<CandidatureModel[]>([]);
  application = signal<ApplicationModel[]>([])

  offerService = inject(OfferService);
  applicationService = inject(ApplicationService);
  search = model('');
  status = model('all');

  router = inject(Router);

  ngOnInit(): void {
    this.offerService.getRecruiterOffers().subscribe({
      next : (data) => {
        this.offers.set(data);
      },
      error: (err) => console.error("Erreur lors du chargement de l'offre: ",err)
    });

    this.applicationService.getApply().subscribe({
      next: (data) => {
        this.applys.set(data);
      },
      error: err => console.log("Erreur lors du chargement des candidatures", err)
    })

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          window.location.reload();
          window.scrollTo(0,0);
        });
  }

  filterOffer = computed(() =>{
    return this.offers().filter(offer => {
      const term = this.search().toLowerCase();
      const matchesText =
        offer.title.toLowerCase().includes(term) ||
        offer.enterprise.toLowerCase().includes(term) ||
        offer.location.toLowerCase().includes(term) ||
        offer.skills.toLowerCase().includes(term);

      const matchesStatus =
        this.status() === 'all' || offer.status.toLowerCase() === this.status();

      return matchesText && matchesStatus;
    });
  });

  onSearchChange(event: { term: string; status: string }) {
    this.search.set(event.term);
    this.status.set(event.status);
  }

  


  createOffer(){
    this.router.navigate(['/recruiter/offers/newoffer'])
  }

}
