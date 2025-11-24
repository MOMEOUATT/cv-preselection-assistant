import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { CandSidebar } from "../components/cand-sidebar/cand-sidebar";
import { OffersCard } from "../../Recruiter/components/offers-card/offers-card";
import { CandOffers } from "../components/cand-offers/cand-offers";
import { Offersmodel } from '../../../models/offersmodel';
import { OfferService } from '../../../service/offer-service';
import { FormsModule } from '@angular/forms';
import { Candsearchbar } from "../components/candsearchbar/candsearchbar";
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-available-offers',
  imports: [CandSidebar, CandOffers, FormsModule, Candsearchbar],
  templateUrl: './available-offers.html',
  styleUrl: './available-offers.css'
})
export class AvailableOffers implements OnInit {

  offers = signal<Offersmodel[]>([]) ;
  offer = new Offersmodel();
  searchTerm = model(''); 
  offerList: Offersmodel[] = [];
  router = inject(Router)

  strdeadline: string = '';
  today: Date = new Date();
  deadline: Date = new Date();

  offerService = inject(OfferService);


  ngOnInit(): void {
    this.loadOffer()
  }

  loadOffer() {
  this.offerService.getAllOffers().subscribe({
    next: (data) => {
      this.offers.set(data);

      //Traitement après réception des données
      for (let i = 0; i < this.offers().length; i++) {
        this.offer = Object.assign(new Offersmodel(), this.offers()[i]);

        for (let j = 0; j < this.offer.deadline.length; j++) {
          this.strdeadline += this.offer.deadline[j];
        }

        this.deadline = new Date(this.strdeadline);
        this.strdeadline = "";

        this.today.setHours(0, 0, 0, 0);
        this.deadline.setHours(0, 0, 0, 0);

        if (this.deadline > this.today) {
          this.offers()[i].status = "active";
        } else {
          this.offers()[i].status = "inactive";
        }
      }

      this.offerList = this.offers().filter(o => o.status === "active");
    },
    error: (err) => console.error("Erreur lors du chargement de l'offre: ", err)
  });
}


  filterOffer = computed(() => {
    const term = this.searchTerm().toLowerCase()
    return this.offerList.filter(o =>
      o.title.toLowerCase().includes(term) || 
      o.enterprise.toLowerCase().includes(term) ||
      o.language.toLowerCase().includes(term) ||
      o.location.toLowerCase().includes(term) ||
      o.skills.toLowerCase().includes(term) ||
      o.type.toLowerCase().includes(term)
    );
  });

}
