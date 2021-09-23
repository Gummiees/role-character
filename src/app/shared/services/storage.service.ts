import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  public set characterId(id: number) {
    if (id > 0) {
      localStorage.setItem('characterId', id.toString());
      this._characterId = id;
    }
  }
  public get characterId(): number {
    if (!this._characterId) {
      this._characterId = Number(localStorage.getItem('characterId')) || 1;
    }
    return this._characterId;
  }
  private _characterId?: number;
  constructor() {}
}
