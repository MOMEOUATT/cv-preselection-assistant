import { Offerstype } from "../utils/offersutils";


export class Offersmodel {
    id: number=0;
    title: string = '';
    enterprise: string = '';
    location: string = '';
    type: string='';
    description: string='';
    min_salary: number=0;
    max_salary: number = 0;
    skills : string= '';
    status: string='';
    language: string='';
    education: string='';
    exp: number=0;
    deadline: string = '';
    duration: string = '';
    createdAt: string= '';
    apply: number=0;
}