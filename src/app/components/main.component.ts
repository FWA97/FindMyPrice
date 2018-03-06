import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-main',
  template: `
    <div>
      <input id="tbSearch" class="tbSearch" type="text" placeholder="Search for Article..." [(ngModel)]="inputSearch"/>
      />
      <button id="btnSearch" class="btnSearch" (click)="load()">&#x2315;</button>
    </div>
    <div id="response"></div>
  `
})

export class MainComponent {
  http: HttpClient;
  title = 'main';
  inputSearch: string;
  highestPrice: ResultItem;
  lowestPrice: ResultItem;
  avgPrice: ResultItem;

  constructor(http: HttpClient) {
    this.http = http;
  }

  load(): void {
    let url = 'http://svcs.ebay.de/services/search/FindingService/v1';
    let items = [];
    let response = this.getJSON(url);
    if (response != null) {
       items = response.searchResult[0].item || [];
    }

    console.log(items);

  }

  getJSON(url: string) {
    let result;
    this.http.post(url, {
      'operation-name': 'findItemsByKewords',
      'service-version': '1.0.0',
      'security-appname': 'AndreasM-Statisti-PRD-151ca6568-9ecacea6',
      'global-id': 'ebay-de',
      'response-data-format': 'json',
      'keywords': encodeURI(this.inputSearch),
      }, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://svcs.ebay.de',
        'Vary': 'origin'    // keine Ahnung ob das so richtig ist
      })
    }).subscribe(item => result = JSON.parse(<string>item));
    if (result != null) {
      return result;
    } else {
      console.log('no result received');
    }
  }
}


class ResultItem {
  type: string;
  name: string;
  price: number;
  imgSource: string;

  constructor(type: string, price: number) {
    this.type = type;
    this.price = price;
  }

}
