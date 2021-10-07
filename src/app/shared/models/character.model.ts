export interface Character {
  id?: string;
  userId?: string;
  name: string;
  story: string;
  personality: string;
  appearance: string;
  // TODO: Ver cómo relacionar con inventario, etc
}
