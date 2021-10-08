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
  public get character(): Promise<Character | null> {
    if (this._character) {
      return Promise.resolve(this._character);
    }
    return new Promise<Character | null>(async (resolve) => {
      this._character = await this.getCharacter();
      resolve(this._character);
    });
  }
  private _character: Character | null = null;
  constructor(private firestore: AngularFirestore, private userService: UserService) {}

  hasCharacters(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const character: Character | null = await this.character;
      return character ? resolve(true) : resolve(false);
    });
  }

  async createCharacter(character: Character, user: firebase.User): Promise<Character> {
    return new Promise((resolve) => {
      character.userId = user.uid;
      this.firestore
        .collection<Character>('characters')
        .add(character)
        .then(() => {
          this._character = character;
          resolve(character);
        });
    });
  }

  async getCharacter(): Promise<Character | null> {
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
            if (items && items.length > 0) {
              const data: Character = items[0].payload.doc.data() as Character;
              data.id = items[0].payload.doc.id;
              resolve(data);
            } else {
              resolve(null);
            }
          });
      } else {
        resolve(null);
      }
    });
  }
}
