import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyPlaylistsComponent} from './my-playlists.component';
import {AppRoutingModule} from '../app-routing.module';



@NgModule({
  declarations: [MyPlaylistsComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class MyPlaylistsModule { }
