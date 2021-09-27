import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/shared.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent, UserSettingsComponent, UserInfoComponent],
  imports: [SharedModule, UserRoutingModule, MatTabsModule, MatIconModule, MatButtonModule],
})
export class UserModule {}