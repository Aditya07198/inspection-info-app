import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrgLocation } from '../models/org-location';
import { Inspection } from '../models/inspection';

@Injectable({
  providedIn: 'root',
})
export class ClientApiService {
  private locationServiceUrl = '/api/locations';
  private inspectionServiceUrl = '/api/inspection-orders';
  constructor(private httpClient: HttpClient) {

  }

  getLocations(): Observable<any> {
    return this.httpClient.get<OrgLocation[]>(`${environment.baseUrl}${this.locationServiceUrl}`, {
        headers: { 'Content-Type': 'application/json' }
    });
  }

    getLocationsById(id: number): Observable<any> {
    return this.httpClient.get<OrgLocation>(`${environment.baseUrl}${this.locationServiceUrl}/${id}`, {
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

   createInspectionOrder(inspection: Inspection): Observable<any> {
    return this.httpClient.post<Inspection>(`${environment.baseUrl}${this.inspectionServiceUrl}`, inspection, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
