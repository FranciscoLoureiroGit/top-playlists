import { Component, OnInit } from '@angular/core';
import {PlaylistsService} from '../services/playlists.service';
import {Playlist} from '../models/playlist.model';

@Component({
  selector: 'app-my-playlists',
  templateUrl: './my-playlists.component.html',
  styleUrls: ['./my-playlists.component.sass'],
  providers: [PlaylistsService]
})
export class MyPlaylistsComponent implements OnInit {
  private playlists: Playlist[];

  constructor(private service: PlaylistsService) { }

  ngOnInit(): void {
    this.service.getMyPlaylists(name)
      .subscribe(data => {
        this.playlists = data;
      });

    console.log('home');
  }
}
