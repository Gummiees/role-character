import { Item } from './item.model';

export interface Character {
  id?: string;
  userId?: string;
  name: string;
  personality: string;
  appearance: string;
  backstory: string;
  story: string;
  gold?: number;
  inventory?: Item[];
}
