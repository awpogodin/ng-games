import {Component, Input} from '@angular/core';
import {RestApiService} from '../../shared/services/rest-api.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {GameModel} from '../../models/game.model';
import {GameValidationService} from '../../shared/services/game-validation.service';
import {Observable} from 'rxjs';

function gameFieldsToString(game: GameModel) {
  const modifiedGame = game;
  for (const key in modifiedGame) {
    if (modifiedGame.hasOwnProperty(key)) {
      modifiedGame[key] = modifiedGame[key].toString();
    }
  }
  return modifiedGame;
}

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent {

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2),
    ]), this.nameAsyncValidator.bind(this)],
    developer: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2)
    ])],
    platforms: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2)
    ])],
  }, {updateOn: 'blur'});
  private initGame: GameModel;

  constructor(
    private restApiService: RestApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private gameValidationService: GameValidationService) {
  }

  @Input()
  set game(value: GameModel) {
    const game = gameFieldsToString(value);
    this.initGame = game;
    this.form.patchValue(game);
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
      if (this.initGame) {
        this.restApiService.updateGame(this.initGame.id, this.form.getRawValue()).subscribe(() => {
          this.router.navigate(['/games']);
        });
      } else {
        this.restApiService.addGame(this.form.getRawValue()).subscribe(() => {
          this.router.navigate(['/games']);
        });
      }
    }
  }

  nameAsyncValidator(control: FormControl): Observable<ValidationErrors> | null {
    if (this.initGame) {
      return this.gameValidationService.validateName(control, this.initGame.name);
    } else {
      return this.gameValidationService.validateName(control, '');
    }
  }

}
