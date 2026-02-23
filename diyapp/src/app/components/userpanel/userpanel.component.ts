import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'userpanel',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './userpanel.component.html',
  styleUrl: './userpanel.component.scss',
})
export class UserPanelComponent {

}
