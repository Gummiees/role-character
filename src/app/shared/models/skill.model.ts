import { TurnPhases } from './turn.model';

export interface StatAffected {
  id?: number;
  statId: number;
  value: number;
}

export interface Skill {
  userId?: string;
  id?: number;
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
