import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/Recruiter/dashboard/dashboard';
import { Offerslist } from './pages/Recruiter/offerslist/offerslist';
import { Candidates } from './pages/Recruiter/candidates/candidates';
import { Candidateslist } from './pages/Recruiter/candidateslist/candidateslist';
import { Settings } from './pages/Recruiter/settings/settings';
import { NgModule } from '@angular/core';
import { Offers } from './pages/Recruiter/offers/offers';
import { NewOffer } from './pages/Recruiter/components/new-offer/new-offer';
import { AvailableOffers } from './pages/Candidate/available-offers/available-offers';
import { MyApplications } from './pages/Candidate/my-applications/my-applications';
import { Details } from './pages/Candidate/details/details';
import { Apply } from './pages/Candidate/components/apply/apply';
import { Offerdetails } from './pages/Candidate/components/offerdetails/offerdetails';
import { Login } from './pages/Login/Signup/login/login';
import { Signup } from './pages/Login/Signup/signup/signup';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';

export const routes: Routes = [{
    path:'',
    redirectTo:'login',
    pathMatch: 'full'
},{
    path:'recruiter/home',
    component: Dashboard,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard, roleGuard('RH')]
},{
    path: 'recruiter/offers',
    children: [{
        path:'',
        component: Offerslist,
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard, roleGuard('RH')]
    },{
        path:'newoffer',
        component: NewOffer,
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard, roleGuard('RH')]
    },{
        path:':id',
        component: Offers,
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard, roleGuard('RH')]
    },{
        path: 'updateoffer',
        children: [{
            path: ':id',
            component: NewOffer,
            runGuardsAndResolvers: 'always',
            canActivate: [authGuard, roleGuard('RH')]
        }]
    }]
},{
    path: 'recruiter/candidates',
    children: [{
        path:'',
        component: Candidateslist,
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard, roleGuard('RH')]
    },{
        path:'viewcandidates',
        component: Candidates,
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard, roleGuard('RH')]
    }]
},{
    path: 'recruiter/settings',
    component: Settings,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard, roleGuard('RH')]
},{
    path:'candidate/offers',
    children: [{
        path:'',
        component: AvailableOffers,
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard, roleGuard('CANDIDATE')]
    },{
        path:'apply',
        children: [{
            path:':id',
            component: Apply,
            runGuardsAndResolvers: 'always',
            canActivate: [authGuard, roleGuard('CANDIDATE')]
        }]
    },{
        path: ':id',
        component: Offerdetails,
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard, roleGuard('CANDIDATE')]
    }]
},{
    path:'candidate/application',
    component: MyApplications,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard, roleGuard('CANDIDATE')]
},{
    path:'candidate/detail',
    component: Details,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard, roleGuard('CANDIDATE')]
},{
    path:'login',
    component: Login,
    runGuardsAndResolvers: 'always'
}, {
    path:'signup',
    component: Signup,
    runGuardsAndResolvers: 'always'
}];


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}