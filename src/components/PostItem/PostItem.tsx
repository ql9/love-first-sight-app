import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Pressable, Text, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';
import {getUser, unVotePost, votePost} from '../../controller';
import auth from '@react-native-firebase/auth';
import {Comment, Heart, HeartFill, More} from '../AllSvgIcon/AllSvgIcon';
import {color, spacing} from '../../theme';
import {VideoPlayer} from '../';
interface ItemPostProps {
  userId: string;
  listCollections: any;
  content: string;
  postId: string;
  votes?: any;
  comments?: any;
  onPressComment?: any;
  onPressMore?: () => void;
}

const WIDTH = Dimensions.get('window').width;

export const PostItem = ({
  userId,
  content,
  listCollections,
  postId,
  votes,
  comments,
  onPressComment,
  onPressMore,
}: ItemPostProps) => {
  const [user, setUser] = useState({
    avatar: '',
    name: '',
  });

  useEffect(() => {
    getUser(userId).then((result) => setUser(result));
  }, [userId]);

  return (
    <View style={styles.itemPost}>
      <View style={styles.topContainerPost}>
        <FastImage
          style={styles.avatar}
          source={{
            // @ts-ignore: Object is possibly 'null'.
            uri: user?.avatar,
            headers: {Authorization: 'staplerapp123456'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.textName}>{user?.name}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.textContent,
            {marginBottom: 10, paddingHorizontal: 16},
          ]}>
          {content}
        </Text>
        {listCollections.length > 0 ? (
          <View style={styles.wrapper}>
            <Swiper
              loop={false}
              activeDotColor={color.primary}
              dotColor={color.light}
              key={listCollections.length}>
              {listCollections.map((item: any) => {
                if (item.mediaType === 'image') {
                  return (
                    <FastImage
                      key={item.collectionId}
                      style={styles.wrapper}
                      source={{
                        // @ts-ignore: Object is possibly 'null'.
                        uri: item.path,
                        headers: {Authorization: 'staplerapp123456'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}
                    />
                  );
                } else {
                  return (
                    <VideoPlayer key={item.collectionId} video={item.path} />
                    // <Video
                    //   key={item.collectionId}
                    //   style={styles.wrapper}
                    //   source={{uri: item.path}}
                    //   resizeMode="cover"
                    //   controls={true}
                    //   paused={true}
                    // />
                  );
                }
              })}
            </Swiper>
          </View>
        ) : null}
      </View>
      <View style={styles.bottomContainerPost}>
        <View style={styles.countView}>
          <Text style={styles.textContent}>{votes.length} </Text>
          <HeartFill />
          <Text style={styles.textContent}> {comments.length} </Text>
          <Comment />
        </View>
        {votes.indexOf(auth().currentUser?.uid) >= 0 ? (
          <Pressable
            style={styles.buttonVote}
            onPress={() => unVotePost(postId)}>
            <HeartFill />
            <Text style={styles.textContent}>Vote</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.buttonVote} onPress={() => votePost(postId)}>
            <Heart />
            <Text style={styles.textContent}> Vote</Text>
          </Pressable>
        )}
        <Pressable style={styles.buttonComment} onPress={onPressComment}>
          <Comment />
          <Text style={styles.textContent}> Comment</Text>
        </Pressable>
      </View>
      {userId === auth().currentUser?.uid && (
        <Pressable
          onPress={onPressMore}
          style={{position: 'absolute', right: 16, top: 10}}>
          <More />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemPost: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 10,
    elevation: 7,
  },
  contentContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  topContainerPost: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  bottomContainerPost: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.1,
    paddingBottom: 10,
    justifyContent: 'space-around',
  },
  countView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonVote: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonComment: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 10,
  },
  textName: {
    fontSize: 16,
    fontWeight: '700',
  },
  textCountHeart: {
    fontSize: 16,
    fontWeight: '300',
  },
  textContent: {
    fontSize: 16,
    fontWeight: '500',
  },
  wrapper: {
    width: WIDTH - spacing[4] * 2,
    height: 350,
  },
});
