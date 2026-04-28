import React, {useImperativeHandle, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {CButton} from '@components/CButton';
import CImage from '@components/CImage';
import {Images} from '@config/Images';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import {useThemeContext} from '@contexts/themeContext';
import GetStyles from './styles';

const CLoginModal = React.forwardRef((props, ref) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  // Destructuring props to extract title, description, and onPress function
  const {} = props;
  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      closeFun();
    },
  }));

  const closeFun = () => {
    setVisible(false);
  };
  const [visible, setVisible] = useState(false);

  return (
    <ReactNativeModal
      isVisible={visible}
      backdropOpacity={0.8}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackdropPress={closeFun}>
      <View style={styles.modalContainer}>
        <CImage src={Images?.imgSplashImage} style={styles.appImage} />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={closeFun}
          style={styles.closeCont}>
          <CustomIcon
            name="close"
            size={size.moderateScale(14)}
            color={color.black}
          />
        </TouchableOpacity>
        <Text style={styles.loginTitle}>Please Log In to Continue</Text>
        <Text style={styles.loginSubtitle}>
          Log in to apply for jobs at your favorite companies.
        </Text>

        <CButton
          label="Login"
          onPress={() => {
            closeFun();
            navigation.navigate('Login');
          }}
        />
      </View>
    </ReactNativeModal>
  );
});

export default CLoginModal;
