import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import CInput from '@components/CInput';
import {CButton} from '@components/CButton';
import CImage from '@components/CImage';
import {useThemeContext} from '@contexts/themeContext';
import {Images} from '@config/Images';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import GetStyles from './styles';

export const LoginModal = ({isVisible, onConfirm, onReject}) => {
  const {color} = useThemeContext();
  const styles = GetStyles();

  return (
    <ReactNativeModal
      isVisible={isVisible}
      backdropOpacity={0.8}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackdropPress={onReject}>
      <View style={styles.reportContainer}>
        <CImage src={Images?.imgSplashImage} style={styles.appImage} />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onReject}
          style={styles.closeCont}>
          <CustomIcon
            name="close"
            size={size.moderateScale(14)}
            color={color.black}
          />
        </TouchableOpacity>
        <Text style={styles.reportTitle}>Please Log In to Continue"</Text>
        <Text style={styles.reportSubtitle}>
          Log in to explore job opportunities and advance your career
        </Text>

        <CButton label="Login" onPress={onConfirm} />
      </View>
    </ReactNativeModal>
  );
};

export const ConfirmationModal = ({
  isVisible,
  onConfirm,
  onReject,
  title,
  yesText = 'Yes',
  noText = 'No',
}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();

  return (
    <ReactNativeModal
      isVisible={isVisible}
      backdropOpacity={0}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackdropPress={onReject}>
      <View style={styles.modalContainer}>
        <View style={styles.messageWrapper}>
          <Text style={styles.messageText}>{title}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.leftButton} onPress={onConfirm}>
            <Text style={[styles.btnLabel, {color: color.red}]}>{yesText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rightButton} onPress={onReject}>
            <Text style={[styles.btnLabel, {color: color.black}]}>
              {noText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export const EnterReportCommentReasonModal = ({
  isVisible,
  onConfirm,
  onReject,
  title,
  yesText,
  noText,
}) => {
  const styles = GetStyles();

  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const maxLength = 200;

  useEffect(() => {
    if (isVisible) {
      setReason('');
      setError('');
    }
  }, [isVisible]);

  return (
    <ReactNativeModal
      isVisible={isVisible}
      avoidKeyboard
      onBackdropPress={onReject}
      backdropOpacity={0.1}
      backdropColor="black"
      animationOut="slideOutDown"
      animationIn="slideInUp"
      onBackButtonPress={onReject}>
      <View style={styles.reportContainer}>
        <TouchableOpacity style={styles.closeBtn} onPress={onReject} />

        <Text style={styles.reportTitle}>{title || 'Report Post'}</Text>

        <Text style={styles.reportSubtitle}>
          Why are you reporting this post
        </Text>

        <CInput
          value={reason}
          onChangeText={text => {
            setReason(text);
            if (text.trim()) setError('');
          }}
          placeholder="Enter description"
          multiline
          maxLength={maxLength}
          errorMsg={error}
        />

        <Text style={styles.charCount}>{`${reason.length}/${maxLength}`}</Text>

        <View style={styles.actionRow}>
          <CButton
            label={yesText || 'Block'}
            onPress={() => {
              if (reason.trim()) {
                onConfirm(reason);
              } else {
                setError('Please enter reason');
              }
            }}
            buttonStyle={styles.btn}
          />
          <CButton
            label={noText || 'Report'}
            onPress={() => {
              if (reason.trim()) {
                onConfirm(reason);
              } else {
                setError('Please enter reason');
              }
            }}
            buttonStyle={styles.btn}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};
