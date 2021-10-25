import { Item } from './item.model';
import { Statistic } from './statistic.model';
import { TurnPhases } from './turn.model';
export interface Character {
  id?: string;
  userId?: string;
  name: string;
  personality: string;
  appearance: string;
  backstory: string;
  story: string;
  turn: number;
  phase: TurnPhases;
  gold: number;
  inventory?: Item[];
  statistics?: Statistic[];
}
