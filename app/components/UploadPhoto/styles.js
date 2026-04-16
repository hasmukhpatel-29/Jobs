import {StyleSheet} from 'react-native';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';

const GetStyles = () => {
  const {color} = useThemeContext();

  return StyleSheet.create({
    labelMainContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      gap: 5,
    },
    labelText: {
      marginBottom: 10,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.small,
      color: color.black,
    },
    requiredText: {
      color: color.red,
    },
    uploadText: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.regular,
      color: color.text,
      marginBottom: 10,
    },
    attachMaxUploadText: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.regular,
      color: color.text,
      marginTop: 6,
      marginBottom: 10,
    },
    imageContainer: {
      flexDirection: 'row',
    },
    imageWrapper: {
      position: 'relative',
    },
    image: {
      height: 82,
      width: 82,
      borderRadius: 80,
      marginHorizontal: 10,
    },
    addButton: {
      width: 82,
      height: 82,
      borderRadius: 80,
      backgroundColor: '#FAFAFA',
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeButton: {
      width: 17,
      height: 17,
      position: 'absolute',
      right: 15,
      backgroundColor: color.white,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    profileImageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
    },
		profileImage: {
			height: size.moderateScale(90),
			width: size.moderateScale(90),
			borderRadius: size.moderateScale(45),
		},
    profileImageUploadBtn: {
      position: 'absolute',
      bottom: size.moderateScale(2),
      right: size.moderateScale(2),
      height: size.moderateScale(35),
      width: size.moderateScale(35),
      borderRadius: size.moderateScale(20),
      backgroundColor: color.black,
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadModal: {
			backgroundColor: color.white,
      padding: 20,
    },
    uploadModalIconAndTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      paddingBottom: 18,
      borderBottomWidth: 1,
      borderBottomColor: color.gray200,
    },
    uploadModalIcon: {
      fontSize: 25,
      color: color.black,
    },
    uploadModalTitleText: {
      fontSize: 16,
      fontFamily: fontFamily.semiBold,
      color: color.black,
      textAlign: 'center',
      marginLeft: 10,
    },
    errorMessageText: {
      color: color.red,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
      marginTop: size.moderateScale(5),
    },
    cameraIcon: {
      fontSize: 24,
      color: color.black,
    },
    btnContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btn: {
      width: '48.5%',
    },
  });
};

export default GetStyles;
