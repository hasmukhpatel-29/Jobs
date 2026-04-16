import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import CImage from '@components/CImage';
import {size} from '@config/Sizes';
import {getImageUrl} from '@utils/commonFunction';

const RenderItem = ({item, onPress, onPressIn, onPressOut}) => {
  const {width} = useWindowDimensions();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{width}}>
      <CImage
        src={getImageUrl(item?.media_url) ?? ''}
        style={[styles.titleImage]}
      />
    </Pressable>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  titleImage: {
    width: '100%',
    height: size.moderateScale(194),
    alignSelf: 'center',
    borderRadius: 5,
  },
});
