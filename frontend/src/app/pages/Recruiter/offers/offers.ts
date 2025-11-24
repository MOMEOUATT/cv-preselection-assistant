import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Sidebar } from "../../../components/sidebar/sidebar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OfferService } from '../../../service/offer-service';
import { Offersmodel } from '../../../models/offersmodel';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApplicationService } from '../../../service/application-service';
import { CandidatureModel } from '../../../models/candidature';
import { ApplicationModel } from '../../../models/applicationmodel';


@Component({
  selector: 'app-offers',
  imports: [MatIconModule, MatCardModule, MatChipsModule, MatButtonModule, CommonModule, Sidebar],
  templateUrl: './offers.html',
  styleUrl: './offers.css'
})
export class Offers implements OnInit {

  router = inject(Router);
  route = inject(ActivatedRoute);
  offerService = inject(OfferService);
  applicationService = inject(ApplicationService);
  applys = signal<CandidatureModel[]>([])
  offers =  signal<Offersmodel[]>([])
  application : ApplicationModel[] = []
  offer =  new Offersmodel();
  
  

  test : string ='';
  offerId: number = 0;
  strdeadline: string = '';
  today: Date = new Date();
  deadline: Date = new Date();
  skills: string[] = [];
  count: number = 0;
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Id = params.get('id');
      this.offerId = Number(Id);

      this.offerService.getRecruiterOffers().subscribe({
        next : (data) => {
          this.offers.set(data);

          // chercher l'offre correspondante
          const foundOffer = this.offers().find(o => o.id === this.offerId);
          console.log(foundOffer)
          if (foundOffer) {
            this.offer = foundOffer;

            // deadline
            this.deadline = new Date(this.offer.deadline);
            this.today.setHours(0,0,0,0);
            this.deadline.setHours(0,0,0,0);

            this.offer.status = this.deadline > this.today ? "active" : "inactive";

            // skills
            this.skills = this.offer.skills ? this.offer.skills.split(",") : [];
            this.test = this.offer.title;
          }
        },
        error: (err) => console.error("Erreur lors du chargement de l'offre: ", err)
      });

      this.applicationService.getApply().subscribe({
        next: (data) => {
          this.applys.set(data);
          
        },
        error: err => console.log("Erreur lors du chargement des candidatures", err)
      });
      
      this.applicationService.getAllApplication().subscribe({
        next: (data) => {
          this.application = data;

          console.log(this.filterapply.length)
          for(let i=0; i<this.filterapply.length; i++){
            if(this.filterapply[i].createdAt!=null){
              this.count++;
            }
            console.log(this.count)
            for(let j=0; j<this.applys().length; j++){
              if(this.applys()[j].offerTitle === this.filterapply[i].offer.title){
                this.filterapply[i].skills = this.applys()[j].cvSkills
              }
            }
          }
        },
        error: err => console.log("Erreur lors du chargement des applications", err)
      })
    });

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        window.location.reload();
        window.scrollTo(0,0);
      });
  }

  filterapply = this.application.filter(o => o.offerId === this.offer.id)

  downloadCv(applicationId: number, firstname: string, lastname: string) {
    this.applicationService.getCv(applicationId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${lastname}_${firstname}_cv.pdf`; // nom du fichier
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }


  Back(){
    this.router.navigate(['/recruiter/offers']);
  }
}
