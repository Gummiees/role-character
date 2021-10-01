import { firebase, firebaseui } from 'firebaseui-angular';

export const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
      customParameters: {
        prompt: 'select_account',
      },
    },
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};
