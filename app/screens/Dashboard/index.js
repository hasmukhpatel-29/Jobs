import {useEffect} from 'react';
import {View} from 'react-native';
import {CHeader} from '@components/CHeader';
import {getUserProfile, profileMeApi} from '@apis/ApiRoutes/UserProfileApi';
import useGlobalStore from '@zustand/store';

const Dashboard = ({openDrawer}) => {
  const isAuthenticated = useGlobalStore(s => {
    return s.isAuthenticated;
  });

  useEffect(() => {
    if (isAuthenticated) {
      getUserProfile();
      profileMeApi();
    }
  }, []);

  return (
    <View>
      <CHeader title="Dashboard" drawer openDrawer={openDrawer} />
    </View>
  );
};
export default Dashboard;
