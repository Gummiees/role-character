import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Character } from '@shared/models/character.model';
import firebase from 'firebase/compat/app';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private firestore: AngularFirestore) {}

  hasCharacters(user: firebase.User | null): Promise<boolean> {
    return new Promise((resolve) => {
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
}
