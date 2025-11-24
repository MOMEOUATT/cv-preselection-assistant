import { Component, OnInit } from '@angular/core';
import { Sidebar } from "../../../components/sidebar/sidebar";
import { Searchbar } from "../components/searchbar/searchbar";
import { CandidatesCard } from "../components/candidates-card/candidates-card";

@Component({
  selector: 'app-candidateslist',
  imports: [Sidebar, CandidatesCard],
  templateUrl: './candidateslist.html',
  styleUrl: './candidateslist.css'
})
export class Candidateslist{

}
