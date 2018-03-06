import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
    let url = 'http://svcs.ebay.com/services/search/FindingService/v1';
    url += '?OPERATION-NAME=findItemsByKeywords';
    url += '&SERVICE-VERSION=1.0.0';
    url += '&SECURITY-APPNAME=AndreasM-Statisti-PRD-151ca6568-9ecacea6';
    url += '&GLOBAL-ID=EBAY-US';
    url += '&RESPONSE-DATA-FORMAT=JSON';
    url += '&callback=getData';
    url += '&REST-PAYLOAD';
    url += '&keywords=' + encodeURI(this.inputSearch);
    url += '&paginationInput.entriesPerPage=100';
    url += '&paginationInput.pageNumber=1';

    let items = [];
    let response = this.getJSON(url);
    if (response != null) {
       items = response.searchResult[0].item || [];
    }

    console.log(items);

  }

  getJSON(url: string) {
    let result;
    this.http.get(url).subscribe(item => result = JSON.parse(<string>item));
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
