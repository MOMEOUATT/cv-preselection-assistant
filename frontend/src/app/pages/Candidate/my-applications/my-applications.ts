import { Component, inject, OnInit, signal } from '@angular/core';
import { CandSidebar } from "../components/cand-sidebar/cand-sidebar";
import { CandidatureCard } from "../components/candidature-card/candidature-card";
import { ApplicationService } from '../../../service/application-service';
import { CandidatureModel } from '../../../models/candidature';

@Component({
  selector: 'app-my-applications',
  imports: [CandSidebar, CandidatureCard],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.css'
})
export class MyApplications implements OnInit {

  applicationService = inject(ApplicationService);
  applys = signal<CandidatureModel[]>([])
  mean: number = 0;


  ngOnInit(): void {
    
    this.applicationService.getMyCandidature().subscribe({
      next: (data) => {
        this.applys.set(data);
        let m = 0;
        
        for(let i=0; i<this.applys().length; i++){
          m+= this.applys()[i].score;
        }
        this.mean = m/this.applys().length;
      },
      error: err => console.log("Erreur lors du chargement des candidatures: ", err)
    })

  }



}
