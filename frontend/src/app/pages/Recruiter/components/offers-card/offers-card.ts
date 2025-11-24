import { Component, inject, input, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OfferService } from '../../../../service/offer-service';
import { Offersmodel } from '../../../../models/offersmodel';
import { SlicePipe } from '@angular/common';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Deleteofferconfirmation } from '../deleteofferconfirmation/deleteofferconfirmation';
import { ApplicationService } from '../../../../service/application-service';
import { ApplicationModel } from '../../../../models/applicationmodel';


@Component({
  selector: 'app-offers-card',
  imports: [SlicePipe],
  templateUrl: './offers-card.html',
  styleUrl: './offers-card.css'
})
export class OffersCard implements OnInit {

  router = inject(Router);
  offerservice = inject(OfferService);
  applicationService = inject(ApplicationService);
  application : ApplicationModel[] = [];
  offer = input(new Offersmodel());
  skill_list: String[] = [];
  firstfoor: String[] = [];
  rst: number = 0;
  strdeadline: string = '';
  today: Date = new Date();
  deadline: Date = new Date();
  readonly dialog = inject(MatDialog);


  ngOnInit(): void {
    this.applicationService.getAllApplication().subscribe({
      next: (data) => {
        this.application = data
        
        let count=0, i=0;
        while(i<this.application.length){
          if(this.application[i].offerId===this.offer().id){
            if(this.application[i].createdAt!=null){
              count++;
            }
          }
          i++;
        }
        this.offer().apply = count;
      },
      error: err => console.log("Erreur lors du chargement des candidatures", err)
    })

    this.skill_list = this.offer().skills.split(",")
    this.firstfoor = this.skill_list.slice(0,4);
    if(this.skill_list.length > 4){
      this.rst = this.skill_list.length - 4;
    }

    for (let i= 0; i<this.offer().deadline.length; i++){
      this.strdeadline += this.offer().deadline[i];
    }
    this.deadline = new Date(this.strdeadline);

    this.today.setHours(0,0,0,0);
    this.deadline.setHours(0,0,0,0);
    
    if(this.deadline > this.today){
      this.offer().status = "active";
    }else{
      this.offer().status = "inactive";
    }

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          window.location.reload();
          window.scrollTo(0,0);
        });

  }

  viewOffer(id: number){
    this.router.navigate(['/recruiter/offers', id], { queryParams: {refresh: new Date().getTime()}});
  }

  updateOffer(id :number){
    this.router.navigate(['/recruiter/offers/updateoffer',id])
  }

  deleteOffer(id: number){
    const dialogRef = this.dialog.open(Deleteofferconfirmation);
    dialogRef.afterClosed().subscribe(confirmation =>{
      if(confirmation){
        this.offerservice.deleteOffer(id).subscribe({
          next: () =>  window.location.reload(),
          error: err => console.log("Erreur lors de la supression de l'offre: ", err)
        });
      }
    })
  }

}
