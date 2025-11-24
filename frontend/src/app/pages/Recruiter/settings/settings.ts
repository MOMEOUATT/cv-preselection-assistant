import { Component, signal } from '@angular/core';
import { Sidebar } from "../../../components/sidebar/sidebar";
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, NG_VALUE_ACCESSOR, ɵInternalFormsSharedModule } from "@angular/forms";
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-settings',
  imports: [MatTabsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    MatButtonModule, 
    Sidebar, 
    MatIconModule, 
    MatSliderModule, 
    ɵInternalFormsSharedModule,
  FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {

  slider1Value: number= 0;
  slider2Value: number= 0;
  slider3Value: number= 0;
  slider4Value: number= 0;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  get total() : number {
    const a = Number(this.slider1Value);
    const b = Number(this.slider2Value);
    const c= Number(this.slider3Value);
    const d = Number(this.slider4Value);
    const e = a + b +c +d;
    return e;
  }

  
  
}
