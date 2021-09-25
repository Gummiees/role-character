import { Inventory } from './inventory.model';
import { Skill } from './skill.model';

export class Character {
  id: string;
  name: string;
  inventory: Inventory[];
  skills: Skill[];
  constructor(id: string, name: string, inventory: Inventory[], skills: Skill[]) {
    this.id = id;
    this.name = name;
    this.inventory = inventory;
    this.skills = skills;
  }
}
