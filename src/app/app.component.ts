import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="nav">
      <app-nav></app-nav>
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <div class="bottom"></div>
  `
})
export class AppComponent {
  title = 'app';
}
