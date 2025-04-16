import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {

  @ViewChild('name') nameKey!: ElementRef;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  startQuiz(){
    const name = this.authService.getUserName() || "Anonimo";
    localStorage.setItem("name",name);
    this.router.navigateByUrl('/pregunta');
  }

}
