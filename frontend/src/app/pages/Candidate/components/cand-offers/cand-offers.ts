import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { routes } from '../../../../app.routes';
import { NavigationEnd, Router } from '@angular/router';
import { OfferService } from '../../../../service/offer-service';
import { Offersmodel } from '../../../../models/offersmodel';
import { filter } from 'rxjs';
import { SlicePipe } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-cand-offers',
  imports: [MatButtonModule, SlicePipe, MatIconModule],
  templateUrl: './cand-offers.html',
  styleUrl: './cand-offers.css'
})
export class CandOffers implements OnInit {

  router = inject(Router);
  offer = input(new Offersmodel());
  skill_list: String[] = [];
  firstfoor: String[] = [];
  rst: number = 0;
  strdeadline: string = '';
  today: Date = new Date();
  deadline: Date = new Date();
  
  ngOnInit(): void {
      this.skill_list = this.offer().skills.split(",")
      this.firstfoor = this.skill_list.slice(0,4);
      if(this.skill_list.length > 4){
        this.rst = this.skill_list.length - 4;
      }

      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
          .subscribe(() => {
            window.location.reload();
            window.scrollTo(0,0);
          });

  }
  
  apply(id: number) {
    this.router.navigate(['/candidate/offers/apply',id])
  }

  details(id: number){
    this.router.navigate(['/candidate/offers/', id])
  }

}
