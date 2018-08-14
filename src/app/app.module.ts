import { AuthService } from './auth.service';
import { AuthguardService } from './authguard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { 
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1912786775426725")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("577815521201-befrdm1e7k2ia1b6rt5051umvnjodqlq.apps.googleusercontent.com")
        },
          
      ]);
  return config;
}
const appRoutes: Routes = [
  { path: '',
   component: LoginComponent,
   canActivate:[AuthguardService]
  },
  { path: 'chatbox',   
   component: ChatboxComponent ,
   canActivate:[AuthService]
   },
   { path: '**',   
   component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    LoginComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent
    
   
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule

  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
