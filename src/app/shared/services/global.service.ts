import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public readonly defaultPhotoUrl: string = 'assets/images/profile-image.jfif';
  public readonly regexUrl: RegExp = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  );
  public readonly turnStart = 'START';
  public readonly turnCombat = 'COMBAT';
  public readonly turnAfterCombat = 'AFTER_COMBAT';
  public readonly turnEnd = 'END';
  public readonly turns = [this.turnStart, this.turnCombat, this.turnAfterCombat, this.turnEnd];
}
