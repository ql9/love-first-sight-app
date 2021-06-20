import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {HeaderCustom, PostItem} from '../../components';
import {getAllPosts, getUserPost} from '../../controller';
import auth from '@react-native-firebase/auth';
import {color} from '../../theme';
import {ROUTER} from '../../constants/router';

export const NewsScreen = () => {
  const navigation = useNavigation();
  const [news, setNews] = useState(null);

  const FlatListHeader = () => {
    //View to set in Header
    return (
      <TouchableOpacity
        style={styles.createPostView}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate(ROUTER.post);
        }}>
        <FastImage
          style={styles.avatar}
          source={{
            // @ts-ignore: Object is possibly 'null'.
            uri: 'https://i.pinimg.com/originals/d5/5e/fc/d55efcc94b469ad21115c1d7fb9f0631.jpg',
            headers: {Authorization: 'staplerapp123456'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <TextInput
          placeholder="Create your new post!!"
          placeholderTextColor="#000000"
          editable={false}
          style={styles.textCreatePost}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    // @ts-ignore: Object is possibly 'null'.
    const subscriber = getAllPosts(auth().currentUser?.uid, (result: any) => {
      setNews(result);
    });
    return () => subscriber;
  }, []);

  return (
    <View style={styles.scrollView}>
      <HeaderCustom
        leftComponent={<Text style={styles.title}>News</Text>}
        backgroundStatusBar={color.bgWhite}
      />
      {news ? (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={FlatListHeader}
          renderItem={({item}) => (
            <PostItem
              userId={item.data().userId}
              postId={item.id}
              content={item.data().content}
              listCollections={item.data().collections}
              votes={item.data().votes ?? []}
              comments={item.data().comments ?? []}
              onPressComment={() =>
                navigation.navigate(ROUTER.detailNew, {
                  postId: item.id,
                  listCollections: item.data().collections,
                  content: item.data().content,
                })
              }
            />
          )}
          contentContainerStyle={styles.contentContainerFlat}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 20,
    color: color.primary,
    fontWeight: 'bold',
  },
  createPostView: {
    width: '100%',
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 7,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 10,
  },
  textCreatePost: {
    flex: 2,
    borderWidth: 0.3,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#F8F8F8',
  },
  contentContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  contentContainerFlat: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    paddingTop: 10,
  },
});
