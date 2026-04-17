import {StyleSheet} from 'react-native';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: color.backgroundColor,
    },
    title: {
      color: color.black,
      fontSize: fontSize.middleSmallMedium,
      fontFamily: fontFamily.medium,
      textAlign: 'center',
      marginBottom: size.moderateScale(10),
      paddingTop: size.moderateScale(15),
    },
    stepMainCont: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: size.moderateScale(15),
      marginBottom: size.moderateScale(20),
      marginHorizontal: size.moderateScale(25),
    },
    stepCont: {
      alignItems: 'center',
      height: size.moderateScale(60),
      zIndex: 10,
    },
    iconCont: bgcolor => ({
      height: size.moderateScale(25),
      width: size.moderateScale(25),
      borderRadius: size.moderateScale(50),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: bgcolor,
    }),
    titleCont: {
      justifyContent: 'center',
      alignItems: 'center',
      width: size.moderateScale(70),
    },
    titleText: bgcolor => ({
      textAlign: 'center',
      fontFamily: fontFamily.medium,
      fontSize: fontSize.verySmall,
      color: bgcolor,
      marginTop: size.moderateScale(6),
      width: size.moderateScale(70),
      alignSelf: 'center',
      flexWrap: 'wrap',
      lineHeight: fontSize.verySmall * 1.3,
    }),
    itemSeparator: bgcolor => ({
      height: size.moderateScale(1),
      backgroundColor: bgcolor,
      flex: 1,
      borderRadius: size.moderateScale(1),
      top: size.moderateScale(10),
    }),
		bottomBtnCont:{
			marginBottom: size.moderateScale(10),
			marginHorizontal: size.moderateScale(20)
		},
    combineBtnCont: {
      flexDirection: 'row',
      alignItems: 'center',
      height: size.moderateScale(42),
      borderRadius: size.moderateScale(50),
      overflow: 'hidden',
      width: '100%',
    },
    backBtn: {
      height: '100%',
      width: size.moderateScale(68),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color.gray200,
    },
    nextBtn: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color.black,
      flexDirection: 'row',
    },
    nextBtnText: {
      color: color.white,
      fontFamily: fontFamily.medium,
      fontSize: fontSize.small,
    },
		icon:{
      transform: [{rotate: '180deg'}],
			color: color.white
		}
  });
};
export default GetStyles;
