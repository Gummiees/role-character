import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from '@shared/shared.module';
import { FirebaseUIModule } from 'firebaseui-angular';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, LoginRoutingModule, AngularFireAuthModule, FirebaseUIModule],
  exports: [],
  providers: [],
})
export class LoginModule {}
