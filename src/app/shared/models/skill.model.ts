import { Base } from './base.model';

export interface StatAffected extends Base {
  statId: number;
  value: number;
}

export interface Skill extends Base {
  name: string;
  description?: string;
  active: boolean;
  doesRollDice: boolean;
  whenRollDice?: string;
  turnBased: boolean;
  turnsLeft: number;
  stats: StatAffected[];
  level?: number;
  caster_name?: string;
}
