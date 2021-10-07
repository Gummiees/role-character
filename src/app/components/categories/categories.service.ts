import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Category } from '@shared/models/category.model';
import { UserService } from '@shared/services/user.service';
import firebase from 'firebase/compat/app';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  constructor(private userService: UserService, private firestore: AngularFirestore) {}

  listItems(): Observable<[Category[], Category[]]> {
    const user: firebase.User | null = this.userService.user;
    if (user) {
      return combineLatest([this.listUserItems(user), this.listUserItems()]);
    }
    return combineLatest([of([]), of([])]);
  }

  async createItem(item: Category): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const user: firebase.User | null = this.userService.user;
      if (user) {
        item.userId = user.uid;
        await this.firestore.collection<Category>('categories').add(item);
        resolve();
      }
      reject('Not signed in!');
    });
  }

  async updateItem(item: Category): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const user: firebase.User | null = this.userService.user;
      if (user) {
        await this.firestore.collection<Category>('categories').doc(item.id).update(item);
        resolve();
      }
      reject('Not signed in!');
    });
  }

  async deleteItem(item: Category): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const user: firebase.User | null = this.userService.user;
      if (user) {
        await this.firestore.collection<Category>('categories').doc(item.id).delete();
        resolve();
      }
      reject('Not signed in!');
    });
  }

  private listUserItems(user?: firebase.User): Observable<Category[]> {
    return this.firestore
      .collection<Category>('categories', (ref) => ref.where('userId', '==', user?.uid || null))
      .snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Category>[]) => {
          return items.map((item: DocumentChangeAction<Category>) => {
            const data: Category = item.payload.doc.data() as Category;
            data.id = item.payload.doc.id;
            return data;
          });
        })
      );
  }
}
