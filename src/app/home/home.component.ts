import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model';
import {ActivatedRoute} from '@angular/router';
import {SharedUserService} from '../services/shared-user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private sharedUser: SharedUserService) {
    console.log('home');
  }

  ngOnInit(): void {
    console.log(this.sharedUser.sharedUser);
    console.log('home');
  }
}
