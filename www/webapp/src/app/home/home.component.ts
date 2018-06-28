import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from "@angular/material";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  // Referenciando elemento da view (sidenav) aqui!
  @ViewChild('sidenav') sidenav:MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  toggleSideNav(){
    if(this.sidenav.opened){
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }

  closeSideNav(){
    this.sidenav.close();
  }

}
