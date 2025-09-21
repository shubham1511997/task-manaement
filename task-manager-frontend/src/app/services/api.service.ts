// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:4000/';

  constructor(private http: HttpClient) {}

  // Auth
  post(user: any, url: string): Observable<any> {
    return this.http.post(`${this.baseUrl}${url}`, user);
  }

  get(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}`);
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  update(id: string, task: any, url: string): Observable<any> {
    return this.http.put(`${this.baseUrl}${url}/${id}`, task);
  }

  delete(id: string, url: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${url}/${id}`);
  }
}
