import {GameModel} from '../../models/game.model';

export class GameValidator {

  static isValid({name, developer, platforms}: GameModel): boolean {
    return (
      GameValidator.isFieldValid(name) &&
      GameValidator.isFieldValid(developer) &&
      GameValidator.isFieldValid(platforms)
    );
  }

  // Validation
  private static isFieldValid(item: string): boolean {
    return !!item.trim();
  }
}
