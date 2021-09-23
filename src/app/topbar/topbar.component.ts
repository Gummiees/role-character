import { Component } from '@angular/core';
import { FileService } from '@shared/services/file.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  public name?: string;
  public loading: boolean = true;
  constructor(private fileService: FileService) {
    this.getName();
  }

  private async getName() {
    this.loading = true;
    try {
      this.name = await this.fileService.getName();
    } finally {
      this.loading = false;
    }
  }
}
