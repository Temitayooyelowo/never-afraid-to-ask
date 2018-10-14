import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  status: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authStatusSubscription.
      subscribe((status: string) => {
        console.log('Status in auth componenet is --->', status);
        this.status = status;
    });
  }

}
