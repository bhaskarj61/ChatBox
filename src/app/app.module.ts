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

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1912786775426725")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("577815521201-sl8fo2gk79mfo5e8u45hou4uaijn8bsv.apps.googleusercontent.com")
        },
          
      ]);
  return config;
}
const appRoutes: Routes = [
  { path: '',
   component: LoginComponent },
  { path: 'chatbox',   
   component: ChatboxComponent },
   { path: '**',   
   component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    LoginComponent,
    PageNotFoundComponent,
    HeaderComponent
    
   
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
