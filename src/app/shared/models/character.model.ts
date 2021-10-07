export interface Character {
  id?: string;
  userId?: string;
  name: string;
  personality: string;
  appearance: string;
  backstory: string;
  // TODO: Ver cómo relacionar con inventario, etc
}
