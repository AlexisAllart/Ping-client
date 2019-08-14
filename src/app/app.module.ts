import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdentificationUserComponent } from './user/identification-user/identification-user.component';
import { SearchUserComponent } from './user/search-user/search-user.component';
import { DashboardUserComponent } from './user/dashboard-user/dashboard-user.component';
import { OfferUserComponent } from './user/offer-user/offer-user.component';
import { ProfileUserComponent } from './user/profile-user/profile-user.component';
import { SignInComponent } from './company/sign-in/sign-in.component';
import { SignUpComponent } from './company/sign-up/sign-up.component';
import { PriceComponent } from './company/price/price.component';
import { SearchCompanyComponent } from './company/search-company/search-company.component';
import { PingComponent } from './company/ping/ping.component';
import { ProfileCompanyComponent } from './company/profile-company/profile-company.component';
import { OfferCompanyComponent } from './company/offer-company/offer-company.component';
import { NavbarCompanyComponent } from './general/navbar-company/navbar-company.component';
import { NavbarUserComponent } from './general/navbar-user/navbar-user.component';
import { WrongWayComponent } from './general/wrong-way/wrong-way.component';
import { BtnBlueComponent } from './layouts/btn-blue/btn-blue.component';
import { BtnGreenComponent } from './layouts/btn-green/btn-green.component';
import { BtnWhiteComponent } from './layouts/btn-white/btn-white.component';
import { CardPingComponent } from './layouts/card-ping/card-ping.component';
import { CompanyCardComponent } from './layouts/company-card/company-card.component';
import { InputBlueComponent } from './layouts/input-blue/input-blue.component';
import { InputSearchComponent } from './layouts/input-search/input-search.component';
import { InputWhiteComponent } from './layouts/input-white/input-white.component';
import { OfferCardComponent } from './layouts/offer-card/offer-card.component';
import { SelectionCardComponent } from './layouts/selection-card/selection-card.component';
import { TitleClearBlueComponent } from './layouts/title-clear-blue/title-clear-blue.component';
import { TitleDarkBlueComponent } from './layouts/title-dark-blue/title-dark-blue.component';
import { UserCardComponent } from './layouts/user-card/user-card.component';
import { BtnSkillsComponent } from './layouts/btn-skills/btn-skills.component';
import { HomeComponent } from './general/home/home.component';
import { SelectionCompanyComponent } from './company/selection-company/selection-company.component';
import { BlueCardUserComponent } from './layouts/blue-card-user/blue-card-user.component';

@NgModule({
  declarations: [
    AppComponent,
    IdentificationUserComponent,
    SearchUserComponent,
    DashboardUserComponent,
    OfferUserComponent,
    ProfileUserComponent,
    SignInComponent,
    SignUpComponent,
    PriceComponent,
    SearchCompanyComponent,
    PingComponent,
    ProfileCompanyComponent,
    OfferCompanyComponent,
    NavbarCompanyComponent,
    NavbarUserComponent,
    WrongWayComponent,
    BtnBlueComponent,
    BtnGreenComponent,
    BtnWhiteComponent,
    CardPingComponent,
    CompanyCardComponent,
    InputBlueComponent,
    InputSearchComponent,
    InputWhiteComponent,
    OfferCardComponent,
    SelectionCardComponent,
    TitleClearBlueComponent,
    TitleDarkBlueComponent,
    UserCardComponent,
    BtnSkillsComponent,
    HomeComponent,
    SelectionCompanyComponent,
    BlueCardUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
