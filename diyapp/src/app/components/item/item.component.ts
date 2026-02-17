import { Component, Input } from '@angular/core';
import { Item } from '../../models/item';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'item',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {

  @Input() item!: Item;

}
