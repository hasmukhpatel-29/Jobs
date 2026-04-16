import {View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import GetStyles from './styles';

const CommonModal = ({
  isVisible,
  modalMainStyle = {},
  childrenViewStyle = {},
  children,
  onReject = () => {},
}) => {
  const styles = GetStyles();

  return (
    <ReactNativeModal
      isVisible={isVisible}
      backdropOpacity={0.5}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackdropPress={onReject}>
      <View style={[styles.modalMainView, modalMainStyle]}>
        <View style={[childrenViewStyle]}>{children}</View>
      </View>
    </ReactNativeModal>
  );
};

export default CommonModal;
