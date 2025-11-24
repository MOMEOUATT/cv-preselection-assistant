import { Offersmodel } from "./offersmodel";

export class ApplicationModel {
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    phone: string = '';
    disponibility: string = '';
    offerId: number = 0;
    offer: Offersmodel = new Offersmodel()
    score: number = 0;
    exp: number= 0;
    createdAt: string='';
    skills: string[] = [];
}