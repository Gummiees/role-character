import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from '@shared/shared.module';
import { FirebaseUIModule } from 'firebaseui-angular';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [SharedModule, SignInRoutingModule, AngularFireAuthModule, FirebaseUIModule],
  exports: [],
  providers: [],
})
export class SignInModule {}
