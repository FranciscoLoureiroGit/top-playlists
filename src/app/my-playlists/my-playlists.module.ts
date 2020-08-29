import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyPlaylistsComponent} from './my-playlists.component';
import {AppRoutingModule} from '../app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [MyPlaylistsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule
  ]
})
export class MyPlaylistsModule { }
