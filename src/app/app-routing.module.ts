import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WrongWayComponent } from './general/wrong-way/wrong-way.component';
import { OfferCompanyComponent } from './company/offer-company/offer-company.component';
import { PingComponent } from './company/ping/ping.component';
import { PriceComponent } from './company/price/price.component';
import { ProfileCompanyComponent } from './company/profile-company/profile-company.component';
import { SearchCompanyComponent } from './company/search-company/search-company.component';
import { SelectionCardComponent } from './layouts/selection-card/selection-card.component';
import { SignInComponent } from './company/sign-in/sign-in.component';
import { SignUpComponent } from './company/sign-up/sign-up.component';
import { DashboardUserComponent } from './user/dashboard-user/dashboard-user.component';
import { IdentificationUserComponent } from './user/identification-user/identification-user.component';
import { ProfileUserComponent } from './user/profile-user/profile-user.component';
import { SearchUserComponent } from './user/search-user/search-user.component';
import { HomeComponent } from './general/home/home.component';
import { SelectionCompanyComponent } from './company/selection-company/selection-company.component';
import { OfferUserComponent } from './user/offer-user/offer-user.component';



const routes: Routes = [

  //component general
  {path: '', component: HomeComponent},
  {path: 'error-404', component: WrongWayComponent},
  
  //component company
  {path: 'offer-company', component: OfferCompanyComponent},
  {path: 'ping', component: PingComponent},
  {path: 'price', component: PriceComponent},
  {path: 'profil-company', component: ProfileCompanyComponent},
  {path: 'search-company', component: SearchCompanyComponent},
  {path: 'selection-company', component: SelectionCompanyComponent},
  {path: 'sign-in-company', component: SignInComponent},
  {path: 'sign-up-company', component: SignUpComponent},
  
  //component user
  {path: 'dashboard-user', component: DashboardUserComponent},
  {path: 'identification-user', component: IdentificationUserComponent},
  {path: 'offer-user', component: OfferUserComponent},
  {path: 'profile-user', component: ProfileUserComponent},
  {path: 'search-user', component: SearchUserComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
