import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Playlist } from '../models/playlist.model';
import {Observable} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  playlistsUrl = `${environment.apiUrl}/playlist`;
  private myPlaylistsUrl: string;


  constructor(
    private http: HttpClient
  ) { }

  public getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.playlistsUrl);
  }

  public getMyPlaylists(name): Observable<Playlist[]> {
    console.log(`${this.playlistsUrl}/${name}`);
    return this.http.get<Playlist[]>(`${this.playlistsUrl}/${name}`);
  }
}


