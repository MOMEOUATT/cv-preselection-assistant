import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ApplicationService } from '../../../../service/application-service';
import { OfferService } from '../../../../service/offer-service';
import { CandidatureModel } from '../../../../models/candidature';
import { Offersmodel } from '../../../../models/offersmodel';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidature-card',
  imports: [CommonModule],
  templateUrl: './candidature-card.html',
  styleUrl: './candidature-card.css'
})
export class CandidatureCard {

  apply = input(new CandidatureModel());
  

}
