import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'top-playlists';
  private user: string;

  constructor(
    private router: Router,
  ) {}

  onClick(): void {
    window.location.href = '/login';
  }

  ngOnInit(): void {
    const href = window.location.href;
    const user = href.split('#')[1];

    if (user != null){
      this.router.navigate(['/home']).then(r => console.log('ok'));
    }
  }
}
