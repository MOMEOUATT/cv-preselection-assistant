import { Component } from '@angular/core';
import { CandSidebar } from "../components/cand-sidebar/cand-sidebar";
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from "@angular/material/tabs";

@Component({
  selector: 'app-details',
  imports: [CandSidebar, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatTabsModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {

}
