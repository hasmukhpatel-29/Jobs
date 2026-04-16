import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {size} from '@config/Sizes';

const ToastContext = createContext(undefined);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 60;
const TOAST_WIDTH = SCREEN_WIDTH;

export const ToastProvider = ({children}) => {
  const [toast, setToast] = useState(null);
  const [startExit, setStartExit] = useState(false);
  const hideTimer = useRef(null);

  const show = ({type = 'info', text1 = '', text2 = '', duration = 3500}) => {
    setToast({type, message: text1, text2});
    setStartExit(false);

    if (hideTimer.current) clearTimeout(hideTimer.current);

    hideTimer.current = setTimeout(() => {
      setStartExit(true);
    }, duration);
  };

  const hide = () => {
    setStartExit(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const handleAnimatedDismissEnd = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{show, hide}}>
      {children}
      {toast && (
        <CustomToast
          type={toast.type}
          message={toast.message}
          text2={toast.text2}
          startExit={startExit}
          onSwipeDismiss={hide}
          onAnimatedDismissEnd={handleAnimatedDismissEnd}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToastInternal = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastInternal must be used within ToastProvider');
  }
  return context;
};

const CustomToast = ({
  type,
  message,
  text2,
  onSwipeDismiss,
  startExit,
  onAnimatedDismissEnd,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const dismissed = useRef(false);

  useEffect(() => {
    if (startExit && !dismissed.current) {
      translateY.value = withTiming(-200, {duration: 200}, () => {
        if (onAnimatedDismissEnd) {
          runOnJS(onAnimatedDismissEnd)();
        }
      });
    }
  }, [startExit, onAnimatedDismissEnd, translateY]);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (!dismissed.current) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        dismissed.current = true;
        const direction = translateX.value > 0 ? 1 : -1;

        translateX.value = withTiming(
          direction * TOAST_WIDTH,
          {duration: 200},
          () => {
            if (onSwipeDismiss) {
              runOnJS(onSwipeDismiss)();
            }
          },
        );
      } else {
        translateX.value = withTiming(0, {duration: 200});
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const backgroundColor =
    {
      success: '#4BB543',
      error: '#FF4C4C',
      info: '#2D9CDB',
      warning: '#F2C94C',
    }[type] || '#333';

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        entering={SlideInUp.duration(300)}
        style={[styles.toastContainer, {backgroundColor}, animatedStyle]}>
        <Text style={styles.toastText}>{message}</Text>
        {text2 ? <Text style={styles.toastSubtitle}>{text2}</Text> : null}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: size.moderateScale(50),
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.9,
    borderRadius: size.moderateScale(8),
    paddingVertical: size.moderateScale(15),
    paddingHorizontal: size.moderateScale(20),
    borderLeftWidth: size.moderateScale(3),
    borderLeftColor: 'white',
    zIndex: 9999,
    elevation: 10,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  toastText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: size.moderateScale(16),
  },
  toastSubtitle: {
    fontSize: size.moderateScale(13),
    color: '#eee',
    marginTop: size.moderateScale(4),
  },
});
