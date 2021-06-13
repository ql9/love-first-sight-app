import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  ImageBackground,
  Text,
} from 'react-native';
import {updateUser} from '../../controller';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the cameras & mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

var engine: RtcEngine;
let sound: Sound;
const nhachuong = require('../../../assets/sounds/chuongdienthoai.mp3');
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const VideoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {appId, channelName, token, avatar, name, userId} = route.params;
  const [props, setProps] = useState({
    peerIds: [],
    vidMute: false,
    audMute: false,
    joinSucceed: false,
  });

  async function init() {
    sound = new Sound(nhachuong);
    sound.setNumberOfLoops(-1);
    sound.setVolume(1);
    engine = await RtcEngine.create(appId);
    await engine.enableVideo(); //Enable the audio
    await engine.joinChannel(token, channelName, null, userId);
    engine.addListener('UserJoined', (uid: number) => {
      // @ts-ignore: Object is possibly 'null'.
      if (props.peerIds.indexOf(uid) === -1) {
        sound.stop();
        // @ts-ignore: Object is possibly 'null'.
        setProps({...props, peerIds: [...props.peerIds, uid]});
      }
    });
    engine.addListener('UserOffline', (uid: number) => {
      setProps({
        ...props,
        peerIds: props.peerIds.filter((result) => result !== uid),
      });
      engine.leaveChannel();
      navigation.goBack();
    });
    engine.addListener('JoinChannelSuccess', () => {
      sound.play();
      setProps({...props, joinSucceed: true});
    });
    engine.addListener('Error', (errorCode) => {
      console.info('Error', errorCode);
    });
  }

  function toggleAudio() {
    engine.muteLocalAudioStream(!props.audMute);
    setProps({...props, audMute: !props.audMute});
  }

  function toggleVideo() {
    engine.muteLocalVideoStream(!props.vidMute);
    setProps({...props, vidMute: !props.vidMute});
  }

  function endCall() {
    sound.stop();
    engine.leaveChannel();
    updateUser({
      stateJoinCall: false,
    });
    setProps({...props, peerIds: [], joinSucceed: false});
    navigation.goBack();
  }

  useEffect(() => {
    requestCameraAndAudioPermission();
    init();
    return () => {
      requestCameraAndAudioPermission();
      init();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.full}>
      {props.peerIds.length === 0 && (
        <ImageBackground
          style={styles.image}
          source={{uri: avatar}}
          resizeMode="cover">
          <Text style={styles.textName}>Calling to {name}...</Text>
        </ImageBackground>
      )}
      {props.peerIds.length > 0 && (
        <View
          style={{
            width: WIDTH,
            height: HEIGHT,
          }}>
          {!props.vidMute && (
            <RtcLocalView.SurfaceView
              style={styles.localVideo}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
              key={auth().currentUser?.uid}
            />
          )}
          <RtcRemoteView.SurfaceView
            style={{
              width: WIDTH,
              height: HEIGHT,
            }}
            uid={props.peerIds[0]}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
            key={props.peerIds[0]}
          />
        </View>
      )}
      <View style={styles.buttonBar}>
        <Icon.Button
          style={styles.iconStyle}
          backgroundColor="#6A1616"
          name={props.audMute ? 'mic-off' : 'mic'}
          onPress={toggleAudio}
        />
        <Icon.Button
          style={styles.iconStyle}
          backgroundColor="#6A1616"
          name="call-end"
          onPress={endCall}
        />
        <Icon.Button
          style={styles.iconStyle}
          backgroundColor="#6A1616"
          name={props.vidMute ? 'videocam-off' : 'videocam'}
          onPress={toggleVideo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBar: {
    height: 50,
    backgroundColor: '#6A1616',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconStyle: {
    fontSize: 34,
    paddingTop: 15,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 15,
    borderRadius: 0,
  },
  full: {
    flex: 1,
  },
  localVideo: {
    width: 150,
    height: 200,
    top: 0,
    right: 0,
    position: 'absolute',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
