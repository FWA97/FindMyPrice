import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {MainComponent} from './components/main.component';
import {AboutComponent} from './components/about.component';

const appRoutes: Routes = [
  {path: 'Main', component: MainComponent},
  {path: 'About', component: AboutComponent},
  {path: '', redirectTo: '/Main', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
