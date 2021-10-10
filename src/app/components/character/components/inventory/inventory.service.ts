import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from '@angular/fire/compat/firestore';
import { Character } from '@shared/models/character.model';
import { Item } from '@shared/models/item.model';
import { UserService } from '@shared/services/user.service';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuyItem } from './buy-item-dialog/buy-item.model';
import { SellItem } from './sell-item-dialog/sell-item.model';

@Injectable()
export class InventoryService {
  private collection?: AngularFirestoreCollection<Item> | null;
  constructor(private firestore: AngularFirestore, private userService: UserService) {}

  private getCollection(
    character: Character,
    user: firebase.User
  ): AngularFirestoreCollection<Item> {
    if (!this.collection) {
      this.collection = this.firestore.collection<Item>(
        `characters/${character.id}/inventory`,
        (ref) => ref.where('userId', '==', user.uid)
      );
    }
    return this.collection;
  }

  public listItems(character: Character, user: firebase.User): Observable<Item[]> {
    if (!character.id) {
      throw new Error('Character ID is required');
    }
    return this.getCollection(character, user)
      .snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Item>[]) => {
          return items.map((item: DocumentChangeAction<Item>) => {
            return {
              ...item.payload.doc.data(),
              id: item.payload.doc.id
            };
          });
        })
      );
  }

  public async createItem(character: Character, item: Item): Promise<void> {
    if (!character.id) {
      throw new Error('Character ID is required');
    }
    const user: firebase.User | null = await this.userService.user;
    if (!user) {
      throw new Error('You must be signed in');
    }
    item.userId = user.uid;
    await this.getCollection(character, user).add(item);
  }

  public async deleteItem(character: Character, item: Item): Promise<void> {
    if (!character.id) {
      throw new Error('Character ID is required');
    }
    const user: firebase.User | null = await this.userService.user;
    if (!user) {
      throw new Error('You must be signed in');
    }
    await this.getCollection(character, user).doc(item.id).delete();
  }

  public async sellItem(character: Character, sellItem: SellItem): Promise<void> {
    if (!character.id) {
      throw new Error('Character ID is required');
    }
    const user: firebase.User | null = await this.userService.user;
    if (!user) {
      throw new Error('You must be signed in');
    }

    if (sellItem.quantity >= sellItem.item.quantity) {
      await this.getCollection(character, user).doc(sellItem.item.id).delete();
    } else {
      const increment: any = firebase.firestore.FieldValue.increment(sellItem.quantity * -1);
      await this.getCollection(character, user)
        .doc(sellItem.item.id)
        .update({ quantity: increment });
    }
  }

  public async buyItem(character: Character, buyItem: BuyItem): Promise<void> {
    if (!character.id) {
      throw new Error('Character ID is required');
    }
    const user: firebase.User | null = await this.userService.user;
    if (!user) {
      throw new Error('You must be signed in');
    }
    const increment: any = firebase.firestore.FieldValue.increment(buyItem.quantity);
    await this.getCollection(character, user).doc(buyItem.item.id).update({ quantity: increment });
  }

  public async updateItem(character: Character, item: Item): Promise<void> {
    if (!character.id) {
      throw new Error('Character ID is required');
    }
    const user: firebase.User | null = await this.userService.user;
    if (!user) {
      throw new Error('You must be signed in');
    }
    await this.getCollection(character, user).doc(item.id).set(item);
  }
}
