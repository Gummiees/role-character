import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Character } from '@shared/models/character.model';
import { UserService } from '@shared/services/user.service';
import firebase from 'firebase/compat/app';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public character?: Character;
  constructor(private firestore: AngularFirestore, private userService: UserService) {}

  hasCharacters(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const user: firebase.User | null = await this.userService.user;
      if (user) {
        this.firestore
          .collection<Character>('characters', (ref) => ref.where('userId', '==', user.uid))
          .snapshotChanges()
          .pipe(
            catchError((err) => {
              console.error(err);
              return of([]);
            }),
            first()
          )
          .subscribe((items: DocumentChangeAction<Character>[]) => {
            resolve(items && items.length > 0);
          });
      } else {
        resolve(false);
      }
    });
  }

  async createCharacter(character: Character, user: firebase.User): Promise<Character> {
    return new Promise((resolve) => {
      character.userId = user.uid;
      this.firestore
        .collection<Character>('characters')
        .add(character)
        .then(() => {
          this.character = character;
          resolve(character);
        });
    });
  }
}
