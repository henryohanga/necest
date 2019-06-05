import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = null;

  constructor(private http: HttpClient, private storage: Storage) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.baseUrl}/coreuser/?client_id=${environment.clientSecret}`,
      user,
    );
  }

  loginUser(user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http
      .post<any>(
        `${environment.baseUrl}/oauth/token/?client_id=${
          environment.clientSecret
        }`,
        `username=${user.username}&password=${
          user.password
        }&grant_type=password`,
        { headers },
      )
      .pipe(
        tap(token => {
          this.token = token;
          this.storage.set('token', token);
        }),
      );
  }

  /**
   * Get user token
   */
  getToken() {
    this.storage.get('token').then(token => {
      this.token = token;
    });

    return this.token;
  }
}
