import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import AccountModal from '@components/AccountModal';
import {CHeader} from '@components/CHeader';
import useGlobalStore from '@zustand/store';
import {useThemeContext} from '@contexts/themeContext';
import {getBusinessList} from '@apis/ApiRoutes/Business';
import GetStyles from './styles';

export default function BusinessDiscover({openDrawer}) {
  const styles = GetStyles();
  const {color} = useThemeContext();

  const userBusinessData = useGlobalStore(s => s.businessData);
  const activeBusinessId = useGlobalStore(s => s.activeBusinessId);

  const [showModal, setShowModal] = useState(false);

  const businessData = useMemo(() => {
    return userBusinessData?.find(b => b.business_id === activeBusinessId);
  }, [userBusinessData, activeBusinessId]);

  useEffect(() => {
    if (!activeBusinessId && userBusinessData?.length > 0) {
      const firstBusiness = userBusinessData[0];
      const firstBranch = firstBusiness?.branches?.[0];

      const store = useGlobalStore.getState();
      store.setActiveBusinessId(firstBusiness.business_id);
      store.setActiveBranchId(firstBranch?.branch_id);
    }
  }, [userBusinessData]);

  useEffect(() => {
    getBusinessList();
  }, []);

  return (
    <View style={{flex: 1}}>
      <CHeader showBusiness title="Dashboard" drawer openDrawer={openDrawer} />
      <AccountModal visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}
