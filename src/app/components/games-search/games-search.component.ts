import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-games-search',
  templateUrl: './games-search.component.html',
  styleUrls: ['./games-search.component.scss']
})
export class GamesSearchComponent {

  search = '';

  constructor(private router: Router) {
  }

  onSubmit(): void {
    this.router.navigate(['/games'], {
      queryParams: {
        search: this.search
      }
    });
  }

}
