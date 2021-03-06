import {Component} from '@angular/core';
import {EbayFindingService} from '../services/ebay.finding.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})

export class MainComponent {
  loading: boolean;
  gotResult: boolean;
  noResult: boolean;
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

    this.noResult = false;
    this.gotResult = false;
    this.loading = true;

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

          this.loading = false;
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

        } else {
          this.loading = false;
          this.noResult = true;
        }
      } else {
        this.loading = false;
        this.noResult = true;
      }

    });

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

