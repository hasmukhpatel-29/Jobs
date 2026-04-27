import React from 'react';
import {
  FlatList,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import {Zoom} from '@components/CZoom';
import CImage from '@components/CImage';
import {useThemeContext} from '@contexts/themeContext';
import {CustomIcon} from '@config/LoadIcons';
import {getImageUrl} from '@utils/commonFunction';
import GetStyles from './styles';

export const ProfileViewModal = ({
  isModalOpen,
  index = 0,
  images,
  onReject,
}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const image = images?.filter(item => item !== 'true');
  const reorderedImages =
    index > 0 ? [image[index], ...image.filter((_, i) => i !== index)] : image;
  return (
    <Modal visible={isModalOpen} transparent={true} animationType="fade">
      <View style={styles.mainContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onReject}
          style={styles.cancelView}>
          <CustomIcon name="close" size={15} color={color.white} />
        </TouchableOpacity>

        <FlatList
          data={reorderedImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item?.gallery_id}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Zoom>
                <CImage
                  src={getImageUrl(item?.media_url)}
                  style={styles.imageView}
                  resizeMode="contain"
                />
              </Zoom>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};
