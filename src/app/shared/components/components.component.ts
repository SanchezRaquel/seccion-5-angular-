import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './components.component.html',
  styleUrl: './components.component.css'
})
export class SidebarComponent{

  constructor(private gisfService: GifsService) { }

  get tags():string[]{
    return this.gisfService.tagsHistory;
  }

  searchTag(tag:string){
    this.gisfService.searchTag(tag);
  }
}
