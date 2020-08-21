import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistsService} from './services/playlists.service';
import {AppRoutingModule} from './app-routing.module';
import {MyPlaylistsModule} from './my-playlists/my-playlists.module';
import {HomeModule} from './home/home.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    MyPlaylistsModule,
    HomeModule
  ],
  providers: [PlaylistsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
