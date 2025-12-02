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

   updateLocation(id: number, location: OrgLocation): Observable<any> {
    return this.httpClient.put<OrgLocation[]>(`${environment.baseUrl}${this.locationServiceUrl}/${id}`, location, {
        headers: { 'Content-Type': 'application/json' }
    });
  }

  createLocation(location: OrgLocation): Observable<any> {
    return this.httpClient.post<OrgLocation>(`${environment.baseUrl}${this.locationServiceUrl}`, location, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
