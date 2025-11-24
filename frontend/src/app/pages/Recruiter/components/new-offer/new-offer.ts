import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild, signal } from '@angular/core';
import { Sidebar } from "../../../../components/sidebar/sidebar";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { Offersmodel } from '../../../../models/offersmodel';
import { OfferService } from '../../../../service/offer-service';
import { join } from 'node:path';
import { AuthService } from '../../../../service/auth-service';
import { User } from '../../../../models/usermodel';


@Component({
  selector: 'app-new-offer',
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatDatepickerModule, 
    Sidebar,
    MatChipsModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './new-offer.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './new-offer.css' ,
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class NewOffer implements OnInit {

  router = inject(Router);
  fb = inject(FormBuilder);

  // Gestion des chips
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: string[] = [];
  languages: string[] = [];
  offers = signal<Offersmodel[]>([])
  offer = new Offersmodel();
  user = new User();
  route = inject(ActivatedRoute);
  offerId: number = 0;

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  offerservice = inject(OfferService);
  authservice = inject(AuthService)

  offerForm = this.fb.group({
    title: ['', Validators.required],
    enterprise: ['', Validators.required],
    duration: [''],
    location: ['', Validators.required],
    type: ['', Validators.required],
    deadline: ['', Validators.required],
    description: ['', Validators.required],
    education: ['', Validators.required],
    exp: [0],
    skills: ['', Validators.required],
    language: ['', Validators.required],
    min_salary: [0],
    max_salary: [0],
  });

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const Id = params.get('id');
      this.offerId = Number(Id);

      this.offerservice.getRecruiterOffers().subscribe({
        next : (data) => {
          this.offers.set(data);

          // chercher l'offre correspondante
          const foundOffer = this.offers().find(o => o.id === this.offerId);
          if (foundOffer) {
            this.offer = foundOffer;
            this.offerForm.patchValue(this.offer);
            this.skills = this.offer.skills.split(",");
            this.languages = this.offer.language.split(",");
          }
        },
        error: (err) => console.error("Erreur lors du chargement de l'offre: ", err)
      });
    });

      
  }

  onButtonClick(){
    const currentUrl = this.router.url;

    if(currentUrl.includes('/recruiter/offers/update')){
      if(this.offerForm.valid){
        const skill = this.skills.join(",");
        const lang = this.languages.join(",");
        this.offerForm.patchValue({skills: skill, language : lang})

        const formData = this.offerForm.value;

        if(formData.deadline){
          formData.deadline = new Date(formData.deadline).toLocaleDateString('fr-CA');
        }

        if(formData.duration == ''){
          this.offerForm.patchValue({duration: 'non précisée'})
        }
        this.offerForm.patchValue({deadline: formData.deadline});
        this.offer = Object.assign(new Offersmodel, this.offerForm.value);
        this.updateOffer(this.offerId, this.offer);
      }
      this.navigateBack()
    } else if(currentUrl.includes('recruiter/offers/new')){
      this.createOffer();
    }
  }

  

  createOffer() {
    if (this.offerForm.valid) {
      const skill = this.skills.join(",");
      const lang = this.languages.join(",");
      this.offerForm.patchValue({skills: skill, language : lang})

      const formData = this.offerForm.value;

      if(formData.deadline){
        formData.deadline = new Date(formData.deadline).toLocaleDateString('fr-CA');
      }

      if(formData.duration == ''){
        this.offerForm.patchValue({duration: 'non précisée'})
      }
      this.offerForm.patchValue({deadline: formData.deadline});
      this.offer = Object.assign(new Offersmodel, this.offerForm.value);
      
      console.log(this.offerForm.value);
      this.offerservice.addOffer(this.offer).subscribe({
        next: (data) => {
          console.log("Offre ajoutée avec succès: ", data);
          alert("Offre ajoutée")
          this.formDirective.resetForm();
          this.skills = [];
          this.languages = [];
        },
        error: (err) => {
          console.log(this.offer)
          console.error("Erreur lors de l'ajout de l'offre: ", err);
        }
      });
    }
  }

  updateOffer(id: number, Offer: Offersmodel){
    this.offerservice.updateOffer(id,Offer).subscribe({
      next: () => {
        alert("Offre modifiée avec succès");
        console.log(Offer);
        this.formDirective.resetForm();
        this.skills = [];
        this.languages = [];
      },
      error: (err) => {
        console.log("Erreur rencontrée lors de la modification de l'offre: ", err);
      }
    })
  }

  navigateBack(){
    this.router.navigate(['/recruiter/offers'])
  }

  addChip(event: MatChipInputEvent, type: string): void {
    const value = (event.value || '').trim();
    if (value) {
      if (type === 'skills') this.skills.push(value);
      if (type === 'languages') this.languages.push(value);
    }
    event.chipInput!.clear();
  }

  removeChip(item: string, type: string): void {
    if (type === 'skills') {
      this.skills = this.skills.filter(s => s !== item);
    } else if (type === 'languages') {
      this.languages = this.languages.filter(l => l !== item);
    }
  }

  updateDeadline(event: any){
    const date = event.value;
    this.offerForm.get('deadline')?.setValue(date);
  }

}
