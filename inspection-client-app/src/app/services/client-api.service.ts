import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrgLocation } from '../models/org-location';

@Injectable({
  providedIn: 'root',
})
export class ClientApiService {
  private locationServiceUrl = '/api/locations';
  constructor(private httpClient: HttpClient) {

  }

  getLocations(): Observable<any> {
    return this.httpClient.get<OrgLocation[]>(`${environment.baseUrl}${this.locationServiceUrl}`, {
        headers: { 'Content-Type': 'application/json' }
    });
  }
}
