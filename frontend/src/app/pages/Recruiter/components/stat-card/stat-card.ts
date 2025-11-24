import { Component, inject, OnInit, signal } from '@angular/core';
import { OfferService } from '../../../../service/offer-service';
import { Offersmodel } from '../../../../models/offersmodel';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css'
})
export class StatCard implements OnInit{

  offerService = inject(OfferService);
  cpt: number = 0;
  offers = signal<Offersmodel[]>([]);
  offer: Offersmodel = new Offersmodel();
  strdeadline: string = '';
  today: Date = new Date();
  deadline: Date = new Date();

  ngOnInit(): void {
      this.offerService.getRecruiterOffers().subscribe({
        next: (data) => {
          this.offers.set(data);
          console.log(this.offers())
          
          this.today.setHours(0,0,0,0);

          for(let i= 0; i<this.offers().length; i++){
            this.offer = Object.assign(this.offers()[i]);
            this.deadline = new Date(this.offers()[i].deadline);
            this.deadline.setHours(0,0,0,0);
            if(this.deadline>this.today){
              this.cpt += 1;
            }
            console.log(this.cpt)
          }
        },
        error: err => console.log(err)
      });
  }

}
