import {Component, Input} from '@angular/core';
import {RestApiService} from '../../shared/services/rest-api.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {GameModel} from '../../models/game.model';
import {GameValidationService} from '../../shared/services/game-validation.service';
import {Observable} from 'rxjs';

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
  private startGame;

  constructor(
    public restApiService: RestApiService,
    public router: Router,
    private formBuilder: FormBuilder,
    private gameValidationService: GameValidationService) {
  }

  @Input()
  set game(value: GameModel) {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        value[key] = value[key].toString();
      }
    }
    this.startGame = value;
    this.form.patchValue(value);
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
      if (this.startGame) {
        this.restApiService.updateGame(this.startGame.id, this.form.getRawValue()).subscribe(() => {
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
    if (this.startGame) {
      return this.gameValidationService.validateName(control, this.startGame.name);
    } else {
      return this.gameValidationService.validateName(control, '');
    }
  }

}
