import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { openRealm, openRealmLocal } from '../../utils/realmApp';
import { AsyncStorage } from 'react-native';

import Realm from 'realm';
import { Button, RadioGroup, Dropdown } from '../../components';
import { TextInput } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toHumanSize } from 'i18n-js';

const changeConfirmed = () =>
  Alert.alert(
    'Profile changed',
    'Profile details have been updated successfully',
    [{ text: 'OK' }],
  );

export default function SettingsScreen(props) {
  const [postalcode, setPostalCode] = React.useState('');
  const [id, setID] = React.useState('');
  const [name, setName] = React.useState('');
  const [unitNum, setUnitNum] = React.useState('');

  const getCurrentUser = async () => {
    const realm = await openRealm();
    const user = await realm.objects('User')[0];
    setPostalCode(user.postalCode);
    setID(user._id);
    setName(user.name);
    setUnitNum(user.unitNum);
  };

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  handleSubmit = async () => {
    //await AsyncStorage.setItem('key', id);
    const realm = await openRealm(id);
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
      //console.log(getCurrentUser());
      realm.syncSession.uploadAllLocalChanges().then(() => {
        realm.close();
      });
      //console.log(realm.objects('User'));
      changeConfirmed();
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
        placeholder={postalcode ? postalcode : 'Postal Code'}
        onChangeText={text => setPostalCode(text)}
        style={{ margin: '7%' }}
      />
      <TextInput
        placeholder={unitNum ? unitNum : 'Unit Number'}
        onChangeText={text => setUnitNum(text)}
        style={{ margin: '7%' }}
      />
      <TextInput
        placeholder={name ? name : 'Name'}
        onChangeText={text => setName(text)}
        style={{ margin: '7%' }}
      />
      <TextInput
        placeholder={id ? id : 'Mobile Number'}
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
