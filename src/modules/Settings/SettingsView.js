import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Entypo';
import { colors, fonts } from '../../styles';

import { Button, RadioGroup, Dropdown } from '../../components';
import { TextInput } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toHumanSize } from 'i18n-js';

const UserSchema = {
  name: 'User',
  properties: {
    _id: 'string',
    name: 'string',
    postalCode: 'string',
    unitNum: 'string',
  },
  primaryKey: '_id',
};

export default function SettingsScreen(props) {
  const [postalcode, setPostalCode] = React.useState('');
  const [_id, setID] = React.useState('');
  const [name, setName] = React.useState('');
  const [unitNum, setUnitNum] = React.useState('');

  handleSubmit = () => {
    console.log(postalcode);
    console.log(_id);
    console.log(name);
    console.log(unitNum);
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
        placeholder="Postal code"
        onChangeText={text => setPostalCode(text)}
        style={{ margin: '7%' }}
      />
      <TextInput
        placeholder="Unit number"
        onChangeText={text => setUnitNum(text)}
        style={{ margin: '7%' }}
      />
      <TextInput
        placeholder="Name"
        onChangeText={text => setName(text)}
        style={{ margin: '7%' }}
      />
      <TextInput
        placeholder="Mobile"
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
