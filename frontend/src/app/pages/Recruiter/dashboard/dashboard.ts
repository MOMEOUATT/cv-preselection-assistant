import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from "../../../components/sidebar/sidebar";
import { StatCard } from "../components/stat-card/stat-card";
import { RecentCandidates } from "../components/recent-candidates/recent-candidates";
import { PopularOffers } from "../components/popular-offers/popular-offers";
import { Test } from "../components/test/test";
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, StatCard, Test],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  router = inject(Router);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          window.location.reload();
          window.scrollTo(0,0);
        });
  }

}
