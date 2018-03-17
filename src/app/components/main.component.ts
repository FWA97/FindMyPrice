import {Component} from '@angular/core';
import {EbayFindingService} from '../services/ebay.finding.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})

export class MainComponent {
  gotResult: boolean;
  inputSearch: string;
  highestPrice: ResultItem;
  lowestPrice: ResultItem;
  avgPrice: number;

  constructor(private ebayFindingService: EbayFindingService) {
  }

  keyDown(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.load();
    }
  }

  load(): void {

    this.ebayFindingService.getItemsByKeywords(this.inputSearch).subscribe((data) => {
      console.log(data);
      let ack = data.findItemsByKeywordsResponse[0].ack;
      console.log(ack);
      if (ack.includes('Success')) {
        let items = data.findItemsByKeywordsResponse[0].searchResult[0].item || [];
        console.log(items);
        if (items.length > 0) {
          let sumPrices = 0;
          let countedPrices = 0;
          this.lowestPrice = new ResultItem(items[0].title[0], parseFloat(items[0].sellingStatus[0].convertedCurrentPrice[0].__value__), items[0].galleryURL[0]);
          this.highestPrice = new ResultItem(items[0].title[0], parseFloat(items[0].sellingStatus[0].convertedCurrentPrice[0].__value__), items[0].galleryURL[0]);

          this.gotResult = true;
          for (let i = 0; i < items.length; i++) {
            if (!items[i].listingInfo[0].listingType[0].includes('Auction')) {
              let price = parseFloat(items[i].sellingStatus[0].convertedCurrentPrice[0].__value__);
              sumPrices += price;
              countedPrices++;
              if (price < this.lowestPrice.price) {
                this.lowestPrice.price = price;
                this.lowestPrice.name = items[i].title[0];
                this.lowestPrice.imgSource = items[i].galleryURL[0];
                console.log('lowest price: ' + i);
              }
              if (price > this.highestPrice.price) {
                this.highestPrice.price = price;
                this.highestPrice.name = items[i].title[0];
                this.highestPrice.imgSource = items[i].galleryURL[0];
                console.log('highest price: ' + i);
              }
            }
          }

          this.avgPrice = Math.round(sumPrices / countedPrices);

        }
      }

    });

  }

  public handleData(data: any): ResultItem[] {
    console.log('calback function was called');
    return null;
  }

}


export class ResultItem {
  name: string;
  price: number;
  imgSource: string;

  constructor(name: string, price: number, imgUrl: string) {
    this.name = name;
    this.price = price;
    this.imgSource = imgUrl;
  }

}

export interface Data {
  findItemsByKeywordsResponse: FindItemsByKeywordsResponse[];
}

export interface FindItemsByKeywordsResponse {
  searchResult: SearchResult[];
  ack: string[];
  paginationOutput: PaginationOutput[];
}

export interface SearchResult {
  item: Item[];
}

export interface Item {
  itemId: string[];
  title: string[];
  galleryURL: string[];
  viewItemURL: string[];
  sellingStatus: SellingStatus[];
  listingInfo: ListingInfo[];
}

export interface SellingStatus {
  convertedCurrentPrice: Price[];
}

interface Price {
  __value__: string;
}

export interface ListingInfo {
  listingType: string[];
}

export interface PaginationOutput {
  pageNumber: string[];
  entriesPerPage: string[];
  totalPages: string[];
  totalEntries: string[];
}

