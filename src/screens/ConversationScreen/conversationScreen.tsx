import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import {RouteStackParamList} from '../../components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getConversation, getConversationWait} from '../../controller';
import FastImage from 'react-native-fast-image';
import {ROUTER} from '../../constants/router';
import {color} from '../../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
const Tab = createMaterialTopTabNavigator();

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

//item Conversation
const ItemConversation = ({item, onPress}: any) => {
  return (
    <TouchableOpacity
      style={styles.itemConversationContainer}
      activeOpacity={0.5}
      onPress={onPress}>
      <FastImage
        style={styles.avatar}
        source={{
          // @ts-ignore: Object is possibly 'null'.
          uri: item.avatar,
          headers: {Authorization: 'staplerapp123456'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{paddingHorizontal: 10}}>
        <Text style={styles.textName}>{item.name}</Text>
        <Text style={styles.textMessage}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ConversationWait = ({navigation}: RouteStackParamList<'InitScreen'>) => {
  const [selectedId, setSelectedId] = useState(null);
  const [conversation, setConversation] = useState();
  const renderItemConversation = ({item}: any) => {
    return (
      <ItemConversation
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate(ROUTER.chat, {
            name: item.name,
            avatar: item.avatar,
            conversationId: item.conversationId,
            ownerId: item.userId,
            state: true,
          });
        }}
        isCheck={true}
      />
    );
  };
  useEffect(() => {
    getConversationWait().then((result) => setConversation(result));
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getConversationWait().then((result) => setConversation(result));
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.allContainer}>
      <View style={styles.container}>
        {conversation === '404 Not Found' ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Don't have Messages Request</Text>
          </View>
        ) : (
          <FlatList
            style={styles.flatlistContainer}
            showsVerticalScrollIndicator={false}
            data={conversation}
            renderItem={renderItemConversation}
            keyExtractor={(item) =>
              // @ts-ignore: Object is possibly 'null'.
              item.conversationId
            }
            extraData={selectedId}
          />
        )}
      </View>
    </View>
  );
};
const Conversation = ({navigation}: RouteStackParamList<'InitScreen'>) => {
  const [selectedId, setSelectedId] = useState(null);
  const [conversation, setConversation] = useState();
  const renderItemConversation = ({item}: any) => {
    return (
      <ItemConversation
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate(ROUTER.chat, {
            name: item.name,
            avatar: item.avatar,
            conversationId: item.conversationId,
            ownerId: item.userId,
            state: false,
          });
        }}
        isCheck={true}
      />
    );
  };
  useEffect(() => {
    getConversation(false, (result: any) => setConversation(result));
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getConversation(false, (result: any) => setConversation(result));
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.allContainer}>
      <View style={styles.container}>
        {conversation === '404 Not Found' ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Don't have Conversations</Text>
          </View>
        ) : (
          <FlatList
            style={styles.flatlistContainer}
            showsVerticalScrollIndicator={false}
            data={conversation}
            renderItem={renderItemConversation}
            keyExtractor={(item) =>
              // @ts-ignore: Object is possibly 'null'.
              item.conversationId
            }
            extraData={selectedId}
          />
        )}
      </View>
    </View>
  );
};

export const ConversationScreen = () => {
  return (
    <SafeAreaView
      style={{width: WIDTH, height: HEIGHT, backgroundColor: color.bgWhite}}
      edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={color.bgWhite} />
      <Tab.Navigator
        lazy
        tabBarOptions={{
          activeTintColor: color.primary,
          inactiveTintColor: color.text,
          labelStyle: {fontSize: 14, fontWeight: 'bold'},
          tabStyle: {height: 50},
          indicatorStyle: {backgroundColor: color.primary},
          style: {
            backgroundColor: color.bgWhite,
          },
        }}>
        <Tab.Screen
          name="Conversations"
          component={Conversation}
          options={{tabBarLabel: 'Conversations'}}
        />
        <Tab.Screen
          name="Messages Request"
          component={ConversationWait}
          options={{tabBarLabel: 'Messages Request'}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  flatlistContainer: {
    flex: 1,
    paddingTop: 10,
  },
  textTitle: {
    fontSize: 17,
    fontWeight: '700',
    fontStyle: 'normal',
    color: '#6A1616',
  },
  itemMatchContainer: {
    height: 120,
    width: 70,
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  textName: {
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'normal',
    color: '#000000',
  },
  itemConversationContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 5,
    borderRadius: 10,
  },
  textMessage: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#919191',
  },
});
