import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-project',
  imports: [RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{


    constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    })
  }
}
