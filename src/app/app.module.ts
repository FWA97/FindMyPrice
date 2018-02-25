import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NavComponent} from './components/nav.component';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {MainComponent} from './components/main.component';

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [   // components and pipes go here
    AppComponent,
    NavComponent,
    MainComponent
  ],
  providers: [],    // services go here
  bootstrap: [AppComponent]
})
export class AppModule { }
