import {size} from '@config/Sizes';
import {StyleSheet} from 'react-native';

const GetStyles = () => {
  return StyleSheet.create({
    profileImage: {
      height: size.moderateScale(53),
      width: size.moderateScale(53),
      borderRadius: size.moderateScale(53),
    },
  });
};

export default GetStyles;
