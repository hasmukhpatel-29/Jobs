import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {Platform, StyleSheet} from 'react-native';

const GetStyles = () => {
  const {color} = useThemeContext();
  const IOS = Platform.OS === 'ios';
  return StyleSheet.create({
    tabContainer: {
      backgroundColor: color.white,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: IOS ? 0.32 : 0.32,
      shadowRadius: IOS ? 4.9 : 20,
      elevation: 7,
    },
    bottomTabIcons: {
      fontSize: fontSize.middleSmallMedium,
      color: color.black,
    },
    tabBar: {
      flexDirection: 'row',
    },
    tab: {
      flex: 1,
      paddingBottom: IOS ? 18 : 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      alignItems: 'center',
      paddingTop: 15,
    },
    icon: {
      fontSize: 25,
    },
    label: {
      color: color.gray,
      paddingTop: 4,
      fontSize: fontSize.littleSmall,
      fontFamily: fontFamily.regular,
    },
    slider: {
      height: 2,
      position: 'absolute',
      top: 0,
      left: 10,
      right: 10,
      backgroundColor: color.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomTabLabels: {
      color: color.primary,
      fontSize: fontSize.littleSmall,
    },
    topIconContainer: {
      borderWidth: 5,
      borderColor: color.white,
      marginTop: -25,
      borderRadius: 40,
      shadowColor: color.black,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 4.0,
      elevation: 5,
    },
    topIcon: {
      backgroundColor: color.primary,
      borderRadius: 20,
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 2,
    },
  });
};
export default GetStyles;
