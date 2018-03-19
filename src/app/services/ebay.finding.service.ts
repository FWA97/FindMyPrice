import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class EbayFindingService {

  http: HttpClient;
  url = 'http://svcs.ebay.de/services/search/FindingService/v1';

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  public aCallbackFunction(input: any) {
    console.log('aCallbackFunction was called');
  }

  public getItemsByKeywords(input: string): Observable<Data> {   // requires same origin policy to be disabled
    let callURL = this.url;
    callURL += '?OPERATION-NAME=findItemsByKeywords';
    callURL += '&SERVICE-VERSION=1.13.0';
    callURL += '&GLOBAL-ID=EBAY-DE';
    callURL += '&RESPONSE-DATA-FORMAT=JSON';
    callURL += '&keywords=' + encodeURI(input);
    callURL += '&paginationInput.entriesPerPage=100';
    callURL += '&paginationInput.pageNumber=1';
    return this.http.get<Data>(callURL, {
      observe: 'body',
      responseType: 'json'
    });
  }

  // This could solve our problem: https://octoperf.com/blog/2016/04/03/angular2-typescript-callback-typing/
  // the only remaining question is, wethter we can use an any type, or have to create some sort of itemType for the response

  public getItemsByKeyords(input: string, callback: (data: any) => void) {   // does not work
    console.log('get items by keyword was called');
    console.log(callback);
    let callURL = this.url;
    callURL += '?OPERATION-NAME=findItemsByKeywords';
    callURL += '&SERVICE-VERSION=1.13.0';
    callURL += '&SECURITY-APPNAME=AndreasM-Statisti-PRD-151ca6568-9ecacea6';
    callURL += '&GLOBAL-ID=EBAY-DE';
    callURL += '&RESPONSE-DATA-FORMAT=JSON';
    callURL += '&callback=' + callback;
    callURL += '&REST-PAYLOAD';
    callURL += '&keywords=' + encodeURI(input);
    callURL += '&paginationInput.entriesPerPage=100';
    callURL += '&paginationInput.pageNumber=1';

    document.createElement('script').setAttribute('src', callURL);
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

