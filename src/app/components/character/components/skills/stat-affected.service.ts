import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from '@angular/fire/compat/firestore';
import { Character } from '@shared/models/character.model';
import { Skill, StatAffected } from '@shared/models/skill.model';
import { UserService } from '@shared/services/user.service';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseCharacterService } from '../../services/base-character.service';

@Injectable()
export class StatAffectedService {
  protected collection?: AngularFirestoreCollection<StatAffected> | null;
  constructor(protected firestore: AngularFirestore, protected userService: UserService) {}

  protected getCollection(
    skill: Skill,
    user: firebase.User
  ): AngularFirestoreCollection<StatAffected> {
    if (!this.collection) {
      this.collection = this.firestore.collection<StatAffected>(
        `characters/${skill.id}/stats`,
        (ref) => ref.where('userId', '==', user.uid)
      );
    }
    return this.collection;
  }

  public listItems(skill: Skill, user: firebase.User): Observable<StatAffected[]> {
    if (!skill.id) {
      throw new Error('Skill ID is required');
    }
    return this.getCollection(skill, user)
      .snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<StatAffected>[]) => {
          return items.map((item: DocumentChangeAction<StatAffected>) => {
            return {
              ...item.payload.doc.data(),
              id: item.payload.doc.id
            };
          });
        })
      );
  }

  public async createItem(skill: Skill, item: StatAffected): Promise<void> {
    if (!skill.id) {
      throw new Error('Skill ID is required');
    }
    const user: firebase.User | null = await this.userService.user;
    if (!user) {
      throw new Error('You must be signed in');
    }
    item.userId = user.uid;
    await this.getCollection(skill, user).add(item);
  }

  public async deleteItem(skill: Skill, item: StatAffected): Promise<void> {
    if (!skill.id) {
      throw new Error('Skill ID is required');
    }
    const user: firebase.User | null = await this.userService.user;
    if (!user) {
      throw new Error('You must be signed in');
    }
    await this.getCollection(skill, user).doc(item.id).delete();
  }
}
