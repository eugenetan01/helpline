import React from 'react';
import { StyleSheet, View, Image, SafeAreaView, Alert } from 'react-native';
import { Button } from '../../components';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

export default function HomeScreen({ isExtended, setIsExtended }) {
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };
  const handlePress = () => {
    Alert.alert(
      'Help is on the way',
      'We have alerted everyone nearby. Help is on the way!',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/images/sos.png')}
        style={styles.Image}
        resizeMode="cover"
      />
      <View style={styles.demoButtonsContainer}>
        <Button
          style={[styles.demoButton, { flexBasis: '60%' }]}
          secondary
          caption="HELP"
          onPress={handlePress}
        />
      </View>
      <View style={styles.containerPeople}>
        <Text style={styles.titleDescription}>
          <Text>Number of people nearby:</Text>
        </Text>
        <Text style={styles.title}>
          <Text>30</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '20%',
  },
  containerPeople: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: '10%',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  Image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#000',
    textAlign: 'right',
    fontFamily: fonts.primaryBold,
    fontSize: 25,
  },
  title: {
    color: '#000',
    textAlign: 'center',
    fontFamily: fonts.primaryBold,
    marginTop: 10,
    fontSize: 20,
    alignSelf: 'center',
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  demoButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
    height: 100,
  },
});
