import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="nav">
      <app-nav></app-nav>
    </div>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'app';
}
