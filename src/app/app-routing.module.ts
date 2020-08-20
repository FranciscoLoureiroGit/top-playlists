import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MyPlaylistsComponent} from './my-playlists/my-playlists.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'my-playlists', component: MyPlaylistsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
