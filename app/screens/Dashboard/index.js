import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {loginModalRef} from '@navigation/mainStackNavigation';
import CardSkeleton from '@components/Skeleton/CardSkeleton';
import {CHeader} from '@components/CHeader';
import JobCard from '@components/JobCard';
import JobFilter from '@components/JobFilter';
import Icon, {Icons} from '@config/Icons';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getJobList} from '@apis/ApiRoutes/JobsApi';
import {useToggleSaveJob} from '@hooks/useToggleSaveJob';
import useGlobalStore from '@zustand/store';
import {getUserProfile, profileMeApi} from '@apis/ApiRoutes/UserProfileApi';
import {useThemeContext} from '@contexts/themeContext';
import GetStyles from './styles';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import Popover from 'react-native-popover-view';
import {productData} from '@config/staticData';
import {openWebsite} from '@utils/commonFunction';

const Dashboard = ({openDrawer}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const isAuthenticated = useGlobalStore(s => {
    return s.isAuthenticated;
  });

  useEffect(() => {
    if (isAuthenticated) {
      getUserProfile();
      profileMeApi();
    }
  }, []);

  const toggleSaveJob = useToggleSaveJob();
  const handleToggleSaveJob = jobId => {
    if (!isAuthenticated) {
      loginModalRef.current?.open();
      return;
    }

    toggleSaveJob(jobId);
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['jobs'],
    queryFn: getJobList,
    getNextPageParam: lastPage => {
      const current = lastPage.pagination.currentPage;
      const total = lastPage.pagination.totalPages;

      return current < total ? current + 1 : undefined;
    },
  });

  const jobs = data?.pages?.flatMap(page => page.data) ?? [];

  const [selectedFilters, setSelectedFilters] = useState({});

  const handleShowResults = filters => {
    setSelectedFilters(filters);
    setIsFilterVisible(false);
    // Here you would typically trigger a refetch with the new filters
    // refetch();
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  return (
    <View style={styles.root}>
      <CHeader
        title="Dashboard"
        drawer
        openDrawer={openDrawer}
        options={{
          headerRight: () => (
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsFilterVisible(true)}
                style={{marginRight: 5}}>
                <Icon
                  type={Icons.Ionicons}
                  name="filter"
                  size={24}
                  color={color.black}
                />
              </TouchableOpacity>
              <TouchableOpacity
                ref={menuRef}
                activeOpacity={0.8}
                onPress={() => setShowMenu(true)}>
                <CustomIcon
                  name="frame"
                  size={size.moderateScale(24)}
                  color={color.black}
                />
              </TouchableOpacity>
            </>
          ),
        }}
      />

      <ReactNativeModal
        isVisible={isFilterVisible}
        onBackdropPress={() => setIsFilterVisible(false)}
        onBackButtonPress={() => setIsFilterVisible(false)}
        style={{margin: 0, justifyContent: 'flex-end'}}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={{height: '90%', width: '100%'}}>
          <View style={{alignItems: 'center', marginBottom: 10}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsFilterVisible(false)}
              style={{
                backgroundColor: '#333',
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <Icon
                type={Icons.MaterialCommunityIcons}
                name="close"
                size={30}
                color={color.white}
              />
            </TouchableOpacity>
          </View>
          <JobFilter
            initialFilters={selectedFilters}
            onClose={() => setIsFilterVisible(false)}
            onShowResults={handleShowResults}
            onClearAll={handleClearFilters}
          />
        </View>
      </ReactNativeModal>

      {isLoading ? (
        <CardSkeleton count={4} />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item, index) => item.job_id || index.toString()}
          renderItem={({item}) => (
            <JobCard item={item} toggleSaveJob={handleToggleSaveJob} />
          )}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          refreshing={isRefetching}
          onRefresh={refetch}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator /> : null
          }
        />
      )}
      <Popover
        isVisible={showMenu}
        from={menuRef}
        onRequestClose={() => setShowMenu(false)}
        placement="bottom">
        <View style={styles.menuContainer}>
          <FlatList
            data={productData}
            renderItem={({item}) => {
              const Icon = item.Icon;
              return (
                <TouchableOpacity
                  style={styles.card}
                  activeOpacity={0.7}
                  onPress={() => openWebsite(item.url)}>
                  <View style={styles.iconContainer}>
                    <Icon width={35} height={35} />
                  </View>
                  <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
            numColumns={3}
            keyExtractor={item => item.id}
            columnWrapperStyle={styles.columnContStyle}
            ItemSeparatorComponent={<View style={{paddingTop: 20}} />}
          />
        </View>
      </Popover>
    </View>
  );
};

export default Dashboard;
