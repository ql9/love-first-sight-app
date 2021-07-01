import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {
  Header,
  CustomIcon,
  RouteStackParamList,
  StatusBarCustom,
} from '../../../components';

export const EmailScreen = ({
  navigation,
}: RouteStackParamList<'SettingsScreen'>) => {
  var isVerified = false;
  return (
    <View style={styles.screen}>
      <StatusBarCustom backgroundColor="#F8F8F8" barStyle="dark-content" />
      <Header
        title="Email"
        showIconLeft={true}
        iconNameLeft="back"
        onPressLeft={() => navigation.goBack()}
      />
      <View style={styles.containerAll}>
        <Text style={styles.itemHeader}>EMAIL</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>trinhviettoan1999@gmail.com</Text>
          {isVerified ? (
            <CustomIcon name="check" size={20} color="#6A1616" />
          ) : (
            <CustomIcon name="informationerror" size={20} color="#6A1616" />
          )}
        </View>
        {isVerified ? (
          <Text style={styles.textNotify}>Verified Email</Text>
        ) : (
          <Text style={styles.textNotify}>Please check your email</Text>
        )}
        {isVerified ? null : (
          <Pressable style={styles.button}>
            <Text style={styles.textButton}>Send Verification Email</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  containerAll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  itemHeader: {
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#0078D4',
    marginTop: 16,
  },
  text: {
    flex: 6,
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#212121',
  },
  textNotify: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#ACACAC',
    marginTop: 5,
  },
  button: {
    height: 45,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A1616',
  },
  textButton: {
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#FFFFFF',
  },
});
