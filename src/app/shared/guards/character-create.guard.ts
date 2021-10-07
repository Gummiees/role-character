import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '@shared/services/user.service';
import { from, Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Character } from '@shared/models/character.model';
import { catchError, first } from 'rxjs/operators';
import { map } from '@firebase/util';
import { CharacterService } from 'src/app/components/character/services/character.service';

@Injectable()
export class CanActivateCharacterCreateGuard implements CanActivate {
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
      if (!hasCharacters) {
        resolve(true);
        return;
      }
      this.router.navigate(['/information']);
      resolve(false);
      return;
    });
  }
}
