import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) { }

  public getUserInfo(name): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${name}`);
  }
}
