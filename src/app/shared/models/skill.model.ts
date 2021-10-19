import { Base } from './base.model';
import { TurnPhases } from './turn.model';

export interface StatAffected extends Base {
  statId: number;
  value: number;
}

export interface Skill extends Base {
  name?: string;
  description?: string;
  active: boolean;
  doesRollDice: boolean;
  whenRollDice: TurnPhases;
  permanent: boolean;
  turnsLeft: number;
  stats: StatAffected[];
  level?: number;
  caster_name?: string;
}
