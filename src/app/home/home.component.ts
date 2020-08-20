import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  private user: User;

  constructor(private route: ActivatedRoute) {
    console.log('home');
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.params.user;
    console.log(this.user);
    console.log('home');
  }

}
