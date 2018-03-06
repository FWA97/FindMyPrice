import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EbayFindingService} from '../services/ebay.finding.service';

@Component({
  selector: 'app-main',
  template: `
    <div>
      <input id="tbSearch" class="tbSearch" type="text" placeholder="Search for Article..." [(ngModel)]="inputSearch"/>
      <button id="btnSearch" class="btnSearch" (click)="load()">&#x2315;</button>
    </div>
    <div id="response"></div>
  `
})

export class MainComponent {
  title = 'main';
  inputSearch: string;
  highestPrice: ResultItem;
  lowestPrice: ResultItem;
  avgPrice: ResultItem;

  constructor(private ebayFindingService: EbayFindingService) {
  }

  load(): void {
    let url = 'http://svcs.ebay.de/services/search/FindingService/v1';
    let items = [];
    let response = this.ebayFindingService.getItemsByKeyords(this.inputSearch);
    if (response != null) {
       items = response.searchResult[0].item || [];
    }

    console.log(items);

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
