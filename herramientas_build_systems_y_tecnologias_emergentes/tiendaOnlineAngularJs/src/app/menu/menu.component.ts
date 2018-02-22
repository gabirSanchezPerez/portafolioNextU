import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ang2-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  	if(localStorage.getItem("currentUserIdAng") == null) {
      this.router.navigate(['/login']);
    }

  }

  salir() {
    localStorage.removeItem("currentUserIdAng");
    this.router.navigate(['/login']);
  }

}
