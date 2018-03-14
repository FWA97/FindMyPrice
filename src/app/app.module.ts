import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NavComponent} from './components/nav.component';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {MainComponent} from './components/main.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EbayFindingService} from './services/ebay.finding.service';
import {EbayInterceptor} from './services/ebay.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  declarations: [   // components and pipes go here
    AppComponent,
    NavComponent,
    MainComponent
  ],
  providers: [    // services go here
    {provide: HTTP_INTERCEPTORS, useClass: EbayInterceptor, multi: true},
    EbayFindingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
