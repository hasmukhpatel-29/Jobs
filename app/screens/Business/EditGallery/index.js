import {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {CHeader} from '@components/CHeader';
import Toast from '@components/CToast';
import CImage from '@components/CImage';
import {ConfirmationModal} from '@components/CModal/ConfirmationModal';
import UploadPhoto from '@components/UploadPhoto';
import {ProfileViewModal} from '@components/CModal/ProfileViewModal';
import useGlobalStore from '@zustand/store';
import {
  deleteBusinessGallery,
  uploadBusinessGallery,
  useBusinessGallery,
} from '@apis/ApiRoutes/Business';
import {getImageUrl} from '@utils/commonFunction';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import {useThemeContext} from '@contexts/themeContext';
import GetStyles from './styles';

const EditGallery = () => {
  const GAP = 20;
  const NUM_COLUMNS = 2;
  const styles = GetStyles(GAP, NUM_COLUMNS);
  const {color} = useThemeContext();
  const activeBranchId = useGlobalStore(s => s.activeBranchId);

  const {data = []} = useBusinessGallery(activeBranchId);
  const [galleryData, setGalleryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const confirmDelete = async () => {
    if (!selectedItem) return;

    const id = selectedItem.gallery_id;

    setGalleryData(prev => prev.filter(item => item.gallery_id !== id));

    setShowDeleteModal(false);
    setSelectedItem(null);

    const response = await deleteBusinessGallery(id);

    if (!response?.success) {
      Toast.show({type: 'error', text1: response?.error?.message});
      setGalleryData(prev => [selectedItem, ...prev]);
    }
  };
  useEffect(() => {
    setGalleryData(data);
  }, [data]);

  const handleUpload = async image => {
    setShowUpload(false);

    setIsUploading(true);

    try {
      const response = await uploadBusinessGallery(activeBranchId, image);

      if (response?.success) {
        setGalleryData(prev => [...response?.data, ...prev]);
        setIsUploading(false);
      } else {
        setIsUploading(false);
        throw new Error();
      }
    } catch (err) {
      Toast.show({type: 'error', text2: 'Upload failed'});
    }
  };

  const HeaderRightComponent = useMemo(() => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={isUploading}
        onPress={() => {
          setShowUpload(true);
        }}>
        {isUploading ? (
          <ActivityIndicator size="small" color={color.black} />
        ) : (
          <CustomIcon
            name="add"
            size={size.moderateScale(20)}
            color={color.black}
          />
        )}
      </TouchableOpacity>
    );
  }, [color, isUploading]);

  return (
    <View style={styles.container}>
      <CHeader
        title="Edit Gallery"
        back
        options={{
          headerRight: () => HeaderRightComponent,
        }}
      />

      <FlatList
        data={galleryData}
        keyExtractor={item => item.gallery_id}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.card}
              onPress={() => {
                setSelectedImageIndex(index);
                setShowImageModal(true);
              }}>
              <CImage src={getImageUrl(item?.media_url)} style={styles.image} />

              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  setShowDeleteModal(true);
                }}
                activeOpacity={0.8}
                style={styles.deleteButton}>
                <CustomIcon
                  name="delete"
                  size={size.moderateScale(18)}
                  color={color.red}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
      {showUpload && (
        <UploadPhoto
          value={galleryData}
          onImageChange={image => handleUpload(image)}
          maxLength={5}
          type="business"
        />
      )}
      <ProfileViewModal
        isModalOpen={showImageModal}
        index={selectedImageIndex}
        images={galleryData}
        onReject={() => setShowImageModal(false)}
      />
      <ConfirmationModal
        isVisible={showDeleteModal}
        onConfirm={confirmDelete}
        onReject={() => setShowDeleteModal(false)}
        title="Are you sure you want to delete this image?"
      />
    </View>
  );
};

export default EditGallery;
