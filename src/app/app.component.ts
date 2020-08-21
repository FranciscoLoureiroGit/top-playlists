import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap, NavigationEnd, RoutesRecognized} from '@angular/router';
import {User} from './models/user.model';
import {SharedUserService} from './services/shared-user.service';
import {filter, pairwise} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'top-playlists';
  user: User;
  previousUrl: string;

  constructor(
    private router: Router,
    private sharedUser: SharedUserService,
  ) {
    console.log(this.sharedUser.sharedUser);
  }

  onClick(): void {
    window.location.href = '/login';
  }

  ngOnInit(): void {
    const href = window.location.href;
    console.log(this.sharedUser.sharedUser);

    if (this.sharedUser.sharedUser === undefined){
      this.sharedUser.sharedUser = new User();
      this.user = this.sharedUser.sharedUser;

      try {
        this.user.name = href.split('#')[1];
        this.sharedUser.sharedUser.name = this.user.name;

        if (this.user.name != null && this.user.name !== 'carouselExampleIndicators'){
          this.router.navigate(['/home']).then(r => console.log('ok'));
        }
      }
      catch (error){
        console.log(error);
      }
    }
  }
}
