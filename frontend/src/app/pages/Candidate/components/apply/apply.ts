import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CandSidebar } from "../cand-sidebar/cand-sidebar";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfferService } from '../../../../service/offer-service';
import { Offersmodel } from '../../../../models/offersmodel';
import { ApplicationService } from '../../../../service/application-service';
import { ApplicationModel } from '../../../../models/applicationmodel';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { Applyofferconfirmation } from '../applyofferconfirmation/applyofferconfirmation';

@Component({
  selector: 'app-apply',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    CandSidebar,
    MatRadioModule,
    FormsModule
],
  templateUrl: './apply.html',
  styleUrl: './apply.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Apply implements OnInit {


  router = inject(Router);
  route = inject(ActivatedRoute);
  offerService = inject(OfferService);
  offers = signal<Offersmodel[]>([]);
  offer = new Offersmodel;
  fb = inject(FormBuilder);
  offerId: number = 0;
  score: number = 0;
  readonly dialog = inject(MatDialog)

  applicationService = inject(ApplicationService);
  application = new ApplicationModel;


  cvFile: File | null = null;
  expRadio: string = '';
  isSubmitting = false;

  applyForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    exp: [0, Validators.required],
    expValue: ['', Validators.required],
    disponibility: [''],
    cv: this.fb.control<File |null>(null, Validators.required)
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Id = params.get('id');
      this.offerId = Number(Id);

      this.offerService.getAllOffers().subscribe({
        next:  (data) => {
          this.offers.set(data);
          const foundOffer = this.offers().find(o => o.id === this.offerId);

          if(foundOffer){
            this.offer = foundOffer;
          }
        },
        error: (err) => console.log("Erreur lors du chargement des offres: ",err )
      });
    });
    
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.size < 5 * 1024 * 1024) { // max 5MB
      this.cvFile = file;
      this.applyForm.patchValue({ cv: file });
    } else {
      alert("Le fichier doit faire moins de 5MB");
    }
  }

  onSubmit() {
    if (this.applyForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formData = this.applyForm.value;
  

      if(formData.disponibility){
        formData.disponibility = new Date(formData.disponibility).toLocaleDateString('fr-CA');
      }
      if(formData.cv){
        this.cvFile = formData.cv;
      }

      this.applyForm.patchValue({disponibility: formData.disponibility});
      this.application = Object.assign(new ApplicationModel, this.applyForm.value);

      this.application.offerId = this.offerId;

      if(this.cvFile){
        this.applicationService.getScore(this.application, this.cvFile).subscribe({
          next: data => {
            const dialogRef = this.dialog.open(Applyofferconfirmation, {data: data});
            dialogRef.afterClosed().subscribe(result => {
              if (result && this.cvFile){
                this.applicationService.apply(this.application, this.cvFile).subscribe({
                  next: (data) => {
                    console.log("Données envoyées :", data);
                    alert("Candidature envoyée !");
                    this.goBack();
                  },
                  error: (err) =>{
                    console.log("Erreur lors de l'envoie de la candidature", err);
                    this.isSubmitting = false;
                    this.handleError(err);

                  }
                });
              } else{
                this.isSubmitting = false;
                this.goBack()
              }
            })
          },
          error: (err) => {
            console.log("Erreur lors du chargement du score", err);
          }
        })
      }
    }
  }

  onCancel() {
    this.applyForm.reset();
    this.cvFile = null;
    this.goBack();
  }


  goBack(){
    this.router.navigate(["/candidate/offers"])
  }

  handleError(err: any) {
    this.isSubmitting = false;

    if (err.status === 409) {
      alert("⚠️ Vous avez déjà postulé à cette offre.");
    } else {
      alert("❌ Erreur lors de l'envoi de la candidature.");
      console.error("Erreur complète :", err);
    }
  }

}
