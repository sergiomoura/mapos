import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from "@angular/material";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  // Referenciando elemento da view (sidenav) aqui!
  @ViewChild('sidenav') sidenav:MatSidenav;

  // Definição de timerId
  private timerId:number;

  constructor(private authService:AuthService) { }


  ngOnInit() {
    // Iniciando o timer que atualiza o token
    this.timerId = window.setInterval(()=>{this.authService.refresh();},1000);
  }

  ngOnDestroy(): void {
    // Interrompendo o timer que atualiza o token
    window.clearInterval(this.timerId);
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
