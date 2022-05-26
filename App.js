import React, {useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Platform,
  TextInput,
} from 'react-native';
import {
  SoftLightBlend,
  Emboss,
  Earlybird,
  Invert,
  RadialGradient,
  Brightness,
  ColorTone,
  Tint,
  Saturate,
} from 'react-native-image-filter-kit';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';

const result = () => {
  let dirs = RNFetchBlob.fs.dirs;
  const [image, setImage] = useState('');
  let imgUrl =
    'https://www.sisa-news.com/data/photos/20200936/art_159912317533_32480a.jpg';

  let newImgUri = imgUrl.lastIndexOf('/');
  let imageName = imgUrl.substring(newImgUri);
  let path =
    Platform.OS === 'ios'
      ? dirs['MainBundleDir'] + imageName
      : dirs.PictureDir + '/test/' + imageName;
  //이미지 저장 부분 함수
  const saveToGallery = () => {
    if (Platform.OS == 'android') {
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
        indicator: true,
        IOSBackgroundTask: true,
        path: path,

        addAndroidDownloads: {
          mediaScannable: true, // these two lines resolve the crash on first download
          mime: 'image/*',
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Image',
        },
      })
        .fetch('GET', image)
        .then(async res => {
          alert('저장');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      CameraRoll.save(image, {type: 'photo', album: '../test'})
        .then(async res => {
          alert('저장');
        })
        .catch(err => {});
    }
  };
  const [number, setnumber] = useState(1); // 1 10 사이
  const [number2, setnumber2] = useState(0); // -1 1 사이
  return (
    <View>
      <TextInput
        style={{borderWidth: 1, width: 100, height: 50, marginTop: 50}}
        onChangeText={data => {
          setnumber(data);
        }}
      />
      <TextInput
        style={{borderWidth: 1, width: 100, height: 50}}
        onChangeText={data => {
          setnumber2(data);
        }}
      />
      <Image
        style={{width: 160, height: 160}}
        source={{
          uri: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E',
        }}
        resizeMode={'contain'}
      />
      <Brightness
        onExtractImage={({nativeEvent}) => {
          console.log(nativeEvent.uri);
        }}
        extractImageEnabled={true}
        image={
          <Image
            style={{width: 160, height: 160}}
            source={{
              uri: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E',
            }}
            resizeMode={'contain'}
          />
        }
        amount={number}
      />
      <Saturate
        onExtractImage={({nativeEvent}) => {
          console.log(nativeEvent.uri);
        }}
        extractImageEnabled={true}
        image={
          <Image
            style={{width: 160, height: 160}}
            source={{
              uri: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E',
            }}
            resizeMode={'contain'}
          />
        }
        amount={Number(number2)}
      />
      <TouchableOpacity
        onPress={() => {
          saveToGallery();
        }}>
        <Text>저장</Text>
      </TouchableOpacity>
    </View>
  );
};

export default result;
