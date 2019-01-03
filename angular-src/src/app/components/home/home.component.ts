import { Component, OnInit } from '@angular/core';
import * as  AppRoutes from '../../app.module';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(AppRoutes.AppModule);
  }

}
