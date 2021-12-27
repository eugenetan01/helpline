import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { openRealm, openRealmLocal } from '../../utils/realmApp';
import { AsyncStorage } from 'react-native';

import Realm from 'realm';
import { Button, RadioGroup, Dropdown } from '../../components';
import { TextInput } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toHumanSize } from 'i18n-js';

export default function SettingsScreen(props) {
  const getCurrentUser = async () => {
    console.log('run');
    const realm = await openRealm(id);
    const user = realm.objects('User')[0];
    return user;
  };

  const [postalcode, setPostalCode] = React.useState(getCurrentUser.postalCode);
  const [id, setID] = React.useState(getCurrentUser._id);
  const [name, setName] = React.useState(getCurrentUser.name);
  const [unitNum, setUnitNum] = React.useState(getCurrentUser.unitNum);

  handleSubmit = async () => {
    const realm = await openRealm(id);
    //"%%partition": "%%user.id" on
    await AsyncStorage.setItem('key', id);
    try {
      realm.write(() => {
        realm.create(
          'User',
          {
            _id: id,
            name: name,
            postalCode: postalcode,
            unitNum: unitNum,
          },
          'modified',
        );
      });
      /* realm.write(() => {
        realm.delete(x);
      }); */

      realm.syncSession.uploadAllLocalChanges().then(() => {
        realm.close();
      });
      console.log(realm.objects('User'));

      console.log(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ paddingTop: '2%' }}>
      <Text
        style={{
          fontSize: 20,
          color: '#555CC4',
          margin: '7%',
          textAlign: 'justify',
        }}
      >
        Adding your information
      </Text>
      <TextInput
        placeholder={postalcode === null ? id : 'Postal Code'}
        onChangeText={text => setPostalCode(text)}
        style={{ margin: '7%' }}
      />
      <TextInput
        placeholder={unitNum === null ? id : 'Unit Number'}
        onChangeText={text => setUnitNum(text)}
        style={{ margin: '7%' }}
      />
      <TextInput
        placeholder={name === null ? id : 'Name'}
        onChangeText={text => setName(text)}
        style={{ margin: '7%' }}
      />
      <TextInput
        placeholder={id === null ? id : 'Mobile Number'}
        onChangeText={text => setID(text)}
        style={{ margin: '7%' }}
      />
      <Text style={{ margin: '7%', textAlign: 'justify' }}>
        By clicking submit, you are agreeing to having your personal information
        collected. Personal information will not be used for any means other
        than for requesting for help, and the main functionalities of this
        application itself.
      </Text>
      <View style={styles.demoButtonsContainer}>
        <Button
          style={[styles.demoButton, { flexBasis: '90%' }]}
          primary
          caption="submit"
          onPress={() => this.handleSubmit()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  demoButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '60%',
  },
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
    height: 30,
  },
});
