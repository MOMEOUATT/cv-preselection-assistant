import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from "../../../components/sidebar/sidebar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  imports: [Sidebar],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css'
})
export class Candidates {

  router = inject(Router);

  return(){
    this.router.navigate(['/recruiter/candidates']);
  }

}
