import { Component, EventEmitter, model, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-searchbar',
  imports: [MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css'
})
export class Searchbar {
  searchTerm = model<string>('');
  statuts = model<string>('all');
  
  search = output<{term:string; status: string}>()

  onSearch(){
    this.search.emit({term: this.searchTerm(), status: this.statuts()});
  }
  

}
