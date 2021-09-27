import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private DEFAULT_PHOTO_URL = 'assets/images/profile-image.jfif';

  get defaultPhotoUrl(): string {
    return this.DEFAULT_PHOTO_URL;
  }
}
