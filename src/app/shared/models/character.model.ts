import { Inventory } from './inventory.model';
import { Skill } from './skill.model';

export interface Character {
  id: string;
  name: string;
  inventory: Inventory[];
  skills: Skill[];
}
