import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adminpanel.component',
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, FormsModule],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss',
})
export class AdminPanelComponent {

}
