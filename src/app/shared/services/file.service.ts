import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { Character } from '@shared/models/character.model';
import { Inventory } from '@shared/models/inventory.model';
import { Skill } from '@shared/models/skill.model';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpClient) {}

  async getFile(): Promise<any> {
    return this.http.get('assets/data.json').toPromise();
  }

  async getCategories(): Promise<Category[]> {
    return this.getFile().then((res: any) => res.categories as Category[]);
  }

  async getCharacters(): Promise<Character[]> {
    return this.getFile().then((res: any) => res.characters as Character[]);
  }

  async getCharacter(characterId: string): Promise<Character | undefined> {
    const characters: Character[] = await this.getCharacters();
    return characters.find((character) => character.id === characterId);
  }

  async getSkills(characterId: string): Promise<Skill[]> {
    const character: Character | undefined = await this.getCharacter(characterId);
    if (!character) {
      return [];
    }
    return character.skills;
  }

  async getName(characterId: string): Promise<string | undefined> {
    const character: Character | undefined = await this.getCharacter(characterId);
    if (!character) {
      return;
    }
    return character.name;
  }

  async getInventory(characterId: string): Promise<Inventory[]> {
    const character: Character | undefined = await this.getCharacter(characterId);
    const categories: Category[] = await this.getCategories();
    if (!character) {
      return [];
    }

    return character.inventory.map((item: any) => {
      item.category = categories.find((cat: Category) => cat.name === item.category);
      item.categoryName = item.category?.name;
      return item as Inventory;
    });
  }
}
