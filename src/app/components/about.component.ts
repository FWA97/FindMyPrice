import {Component} from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <p>
      Diese Application dient dazu, aus den ebay Suchergebnissen den statistischen Mittelwert der Preise und den Maximal- und Minimalpreis errechnen zu lassen.
    </p>
  `
})

export class AboutComponent {
  constructor() {

  }
}
