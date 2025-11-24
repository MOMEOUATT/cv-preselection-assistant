import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'app-applyofferconfirmation',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './applyofferconfirmation.html',
  styleUrl: './applyofferconfirmation.css'
})
export class Applyofferconfirmation {
  
 constructor(@Inject(MAT_DIALOG_DATA) public data: number =0){}

}
