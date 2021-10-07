import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';
import { CharacterService } from 'src/app/components/character/services/character.service';

@Injectable()
export class CanActivateCharacterGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private characterService: CharacterService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>(async (resolve) => {
      const hasCharacters: boolean = await this.characterService.hasCharacters(
        this.userService.user
      );
      if (hasCharacters) {
        resolve(true);
        return;
      }
      this.router.navigate(['/create']);
      resolve(false);
      return;
    });
  }
}
