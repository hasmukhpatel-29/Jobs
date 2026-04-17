import {CHeader} from '@components/CHeader';
import {View} from 'react-native';
import useGlobalStore from '@zustand/store';
import GetStyles from './styles';

const AddBusiness = () => {
  const styles = GetStyles();
  const userData = useGlobalStore(s => s.userData);
  return (
    <View style={styles.mainView}>
      <CHeader
        title={`${userData?.first_name || ''} ${userData?.last_name || ''}`}
        back
        profileImg
      />
    </View>
  );
};
export default AddBusiness;
