import {Component} from '@angular/core';
import {RestApiService} from '../../shared/services/rest-api.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-game-form',
  templateUrl: './games-add.component.html',
  styleUrls: ['./games-add.component.scss']
})
export class GamesAddComponent {

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2),

    ])],
    developer: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2)
    ])],
    platforms: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2)
    ])],
  });

  constructor(public restApiService: RestApiService, public router: Router, private formBuilder: FormBuilder) {
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get developer(): AbstractControl {
    return this.form.get('developer');
  }

  get platforms(): AbstractControl {
    return this.form.get('platforms');
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.restApiService.addGame(this.form.getRawValue()).subscribe(() => {
        this.router.navigate(['/games']);
      });
    }
  }

  // addGame(): void {
  //   const game: GameModel = {
  //     name: this.name,
  //     developer: this.developer,
  //     platforms: this.platforms
  //   };
  //   if (GameValidator.isValid(game)) {
  //     this.restApiService.addGame(game).subscribe(() => {
  //       this.router.navigate(['/games']);
  //     });
  //   } else {
  //     this.error = 'Введены неверные данные';
  //   }
  //
  // }

}
