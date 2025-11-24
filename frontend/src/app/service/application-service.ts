import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationModel } from '../models/applicationmodel';
import { CandidatureModel } from '../models/candidature';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://localhost:8080/api/applications';
  private Url = 'http://localhost:8080/api/applications/candidature';

  constructor(private http: HttpClient){}

  apply(application: ApplicationModel, cv: File){

    const formData = new FormData();

    // Sérialiser l'objet application en JSON
    const jsonBlob = new Blob([JSON.stringify(application)], { type: 'application/json' });
    formData.append('data', jsonBlob);
    formData.append('cv', cv);

    return this.http.post<ApplicationModel>(this.baseUrl, formData, {withCredentials: true});
  }

  getApply(){
    return this.http.get<CandidatureModel[]>(this.Url, {withCredentials: true});
  }
  
  getMyCandidature(){
    return this.http.get<CandidatureModel[]>(this.Url + "/my",{withCredentials: true} )
  }

  getAllApplication(){
    return this.http.get<ApplicationModel[]>(this.baseUrl, {withCredentials: true});
  }

  getCv(applicationId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8080/api/applications/${applicationId}/cv`, {
      responseType: 'blob',
      withCredentials: true
    });
  }

  getScore(application: ApplicationModel, cv: File){

    const formData = new FormData();

    // Sérialiser l'objet application en JSON
    const jsonBlob = new Blob([JSON.stringify(application)], { type: 'application/json' });
    formData.append('data', jsonBlob);
    formData.append('cv', cv);

    return this.http.post(this.baseUrl+"/score", formData,{withCredentials:true})
  }
  
}
