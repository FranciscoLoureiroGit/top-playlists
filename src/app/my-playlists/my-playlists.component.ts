import { Component, OnInit } from '@angular/core';
import {PlaylistsService} from '../services/playlists.service';
import {Playlist} from '../models/playlist.model';
import {SharedUserService} from '../services/shared-user.service';

@Component({
  selector: 'app-my-playlists',
  templateUrl: './my-playlists.component.html',
  styleUrls: ['./my-playlists.component.sass'],
  providers: [PlaylistsService]
})
export class MyPlaylistsComponent implements OnInit {
  playlists: Playlist[];

  constructor(private service: PlaylistsService,
              private sharedUser: SharedUserService) { }

  ngOnInit(): void {
    this.service.getMyPlaylists(this.sharedUser.sharedUser.name)
      .subscribe(data => {
        this.playlists = data;
        console.log(this.playlists);
      });
  }
}
