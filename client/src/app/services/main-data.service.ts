import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MainDataService {
  constructor(private http: HttpClient) {}

  getData() {
    const url = '/api/data/all';
    return this.http.get<any>(url);
  }
}
