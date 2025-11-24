import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candsearchbar',
  imports: [FormsModule],
  templateUrl: './candsearchbar.html',
  styleUrl: './candsearchbar.css'
})
export class Candsearchbar {
  searchTerm = model<string>('');

  search = output();

  Search(){
    this.search.emit();
  }

}
