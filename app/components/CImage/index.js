import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import {Images} from '@config/Images';
import GetStyles from './styles';

const CImage = props => {
  const styles = GetStyles();

  // Destructuring props to extract values
  const {src = '', style = {}, resizeMode = FastImage.resizeMode.cover} = props;

  // State Variables
  const [error, setError] = useState(false);

  return (
    <FastImage
      source={
        error
          ? Images?.appLogo
          : _.isString(src)
          ? {uri: src, priority: FastImage.priority.high}
          : src || Images?.appLogo
      }
      onError={() => {
        setError(true);
      }}
      style={[styles.profileImage, style]}
      resizeMode={resizeMode}
    />
  );
};

export default CImage;
