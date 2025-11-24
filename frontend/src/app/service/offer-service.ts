import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offersmodel } from '../models/offersmodel';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private baseUrl = 'http://localhost:8080/api/offers';

  constructor(private http: HttpClient) {}

  addOffer(offer: Offersmodel){
    return this.http.post<Offersmodel>(this.baseUrl, offer, {withCredentials: true});
  }

  getRecruiterOffers(){
    return this.http.get<Offersmodel[]>(this.baseUrl + '/my', {withCredentials: true});
  }
  getOfferById(id: number){
    return this.http.get<Offersmodel>(`${this.baseUrl}/${id}`,{withCredentials: true} )
  }

  getAllOffers(){
    return this.http.get<Offersmodel[]>(this.baseUrl, {withCredentials: true})
  }

  updateOffer(id: number, offer: Offersmodel){
    return this.http.put<Offersmodel>(`${this.baseUrl}/${id}`, offer, {withCredentials: true});
  }

  deleteOffer(id: number){
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {withCredentials: true});
  }
  
}
