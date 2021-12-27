import Realm from 'realm';
import { User } from './User';
import { AsyncStorage } from 'react-native';
const OpenRealmBehaviorConfiguration = {
  type: 'openImmediately',
};

export async function getRealmApp() {
  const appId = 'application-0-clbep'; // Set Realm app ID here.
  const appConfig = {
    id: appId,
  };
  const yes = new Realm.App(appConfig);
  //console.log(yes);
  return yes;
}

export async function anonymousLogin() {
  try {
    const app = await getRealmApp(); // pass in the appConfig variable that you created earlier
    //console.log(app);
    const credentials = Realm.Credentials.anonymous(); // create an anonymous credential
    const user = app.logIn(credentials);
    //console.log(user);
    return user;
  } catch (error) {
    throw `Error logging in anonymously: ${JSON.stringify(error, null, 2)}`;
  }
}

export async function openRealm() {
  //let UserSchema;
  const user = await anonymousLogin();
  const id = await AsyncStorage.getItem('key');
  let realm;
  try {
    // ...
    console.log(`Logged in with the user: ${user.identity}`);
    const config = {
      schema: [User.schema],
      sync: {
        user: user,
        partitionValue: id,
      },
    };
    realm = await Realm.open(config);

    return realm;
  } catch (error) {
    throw `Error opening realm: ${JSON.stringify(error, null, 2)}`;
  }
}
