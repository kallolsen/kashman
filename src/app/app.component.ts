import { AuthComponent } from './shared/auth/auth.component';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KashMan Console';
}
