import { Component, OnDestroy } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { Character } from '@shared/models/character.model';
import { BasicDialogModel } from '@shared/models/dialog.model';
import { Item } from '@shared/models/item.model';
import { CommonService } from '@shared/services/common.service';
import { DialogService } from '@shared/services/dialog.service';
import { LoadersService } from '@shared/services/loaders.service';
import { MessageService } from '@shared/services/message.service';
import { UserService } from '@shared/services/user.service';
import firebase from 'firebase/compat/app';
import { Subscription, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { CategoryService } from 'src/app/components/categories/categories.service';
import { CharacterService } from '../../services/character.service';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnDestroy {
  public isEditingRow: boolean = false;
  inventory: Item[] = [];
  categories: Category[] = [];
  private clonedItems: { [s: string]: Item } = {};
  private subscriptions: Subscription[] = [];
  constructor(
    public loadersService: LoadersService,
    private characterService: CharacterService,
    private categoryService: CategoryService,
    private inventoryService: InventoryService,
    private userService: UserService,
    private dialogService: DialogService,
    private commonService: CommonService,
    private messageService: MessageService
  ) {
    this.subscribeToInventory();
    this.subscribeToCategoryList();
  }

  buttonsDisabled(): boolean {
    return (
      this.loadersService.categoriesLoading ||
      this.loadersService.inventoryLoading ||
      this.isEditingRow
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  addItem() {
    this.dialogService
      .openGenericDialog(AddItemDialogComponent, this.categories)
      .subscribe((item: Item) => {
        if (!this.commonService.isNullOrUndefined(item)) {
          this.createItem(item);
        }
      });
  }

  private async createItem(item: Item) {
    this.loadersService.inventoryLoading = true;
    try {
      const character: Character | null = await this.characterService.character;
      if (character) {
        await this.inventoryService.createItem(character, item);
        this.messageService.showOk('Item added successfully');
      } else {
        this.messageService.showLocalError('You must have a character to add an item');
      }
    } catch (e: any) {
      console.error(e);
      this.messageService.showLocalError(e);
    } finally {
      this.loadersService.inventoryLoading = false;
    }
  }

  public async onEditInit(item: Item) {
    if (item.id) {
      this.clonedItems[item.id] = { ...item };
      this.isEditingRow = true;
    }
  }

  public async onEditCancel(item: Item, index: number) {
    if (item.id) {
      this.inventory[index] = this.clonedItems[item.id];
      delete this.clonedItems[item.id];
      this.isEditingRow = false;
    }
  }

  public async onEditSave(item: Item) {
    if (item.id) {
      this.loadersService.inventoryLoading = true;
      try {
        const character: Character | null = await this.characterService.character;
        if (character) {
          await this.inventoryService.updateItem(character, item);
          this.isEditingRow = false;
          this.messageService.showOk('Item updated successfully');
        } else {
          this.messageService.showLocalError('You must have a character to update an item');
        }
      } catch (e: any) {
        console.error(e);
        this.messageService.showLocalError(e);
      } finally {
        this.loadersService.inventoryLoading = false;
      }
    }
  }

  public async onDelete(item: Item) {
    const dialogModel: BasicDialogModel = {
      body: 'Are you sure you want to delete the item?'
    };
    this.dialogService
      .openDialog(dialogModel)
      .pipe(first())
      .subscribe(() => this.delete(item));
  }

  private async delete(item: Item) {
    this.loadersService.inventoryLoading = true;
    try {
      const character: Character | null = await this.characterService.character;
      if (character) {
        await this.inventoryService.deleteItem(character, item);
        this.messageService.showOk('Item deleted successfully');
      } else {
        this.messageService.showLocalError('You must have a character to delete an item');
      }
    } catch (e: any) {
      console.error(e);
      this.messageService.showLocalError(e);
    } finally {
      this.loadersService.inventoryLoading = false;
    }
  }

  private async subscribeToInventory() {
    const user: firebase.User | null = await this.userService.user;
    if (user) {
      const character: Character | null = await this.characterService.character;
      if (character) {
        this.loadersService.inventoryLoading = true;
        const sub: Subscription = this.inventoryService
          .listItems(character, user)
          .pipe(
            catchError((err) => {
              this.loadersService.categoriesLoading = false;
              return throwError(err);
            })
          )
          .subscribe((inventory: Item[]) => {
            this.inventory = inventory;
            this.loadersService.inventoryLoading = false;
          });
        this.subscriptions.push(sub);
      } else {
        this.messageService.showLocalError('You must have a character');
      }
    } else {
      this.messageService.showLocalError('You must be logged in');
    }
  }

  private async subscribeToCategoryList() {
    const user: firebase.User | null = await this.userService.user;
    if (user) {
      this.loadersService.categoriesLoading = true;
      const sub: Subscription = this.categoryService
        .listItems(user)
        .pipe(
          catchError((err) => {
            this.loadersService.categoriesLoading = false;
            return throwError(err);
          })
        )
        .subscribe((categories: any) => {
          this.categories = categories.flat() || [];
          this.loadersService.categoriesLoading = false;
        });
      this.subscriptions.push(sub);
    } else {
      this.messageService.showLocalError('You must be logged in');
    }
  }
}
