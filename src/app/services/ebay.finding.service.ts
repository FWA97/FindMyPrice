import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()

export class EbayFindingService {

  http: HttpClient;
  url = 'http://svcs.ebay.de/services/search/FindingService/v1';

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  public getItemsByKeyords(input: string): any {
    let result;
    this.http.post(this.url, {
      'operation-name': 'findItemsByKewords',
      'service-version': '1.0.0',
      'security-appname': 'AndreasM-Statisti-PRD-151ca6568-9ecacea6',
      'global-id': 'ebay-de',
      'response-data-format': 'json',
      'keywords': encodeURI(input),
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
