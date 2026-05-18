import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Popover from 'react-native-popover-view';
import Geolocation from '@react-native-community/geolocation';
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
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import {productData, SIDEBAR_DATA} from '@config/staticData';
import {openWebsite} from '@utils/commonFunction';
import GetStyles from './styles';

const Dashboard = ({openDrawer}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filterCategoryId, setFilterCategoryId] = useState(null);
  const {selectedCity, setSelectedCity} = useGlobalStore();
  const isAuthenticated = useGlobalStore(s => {
    return s.isAuthenticated;
  });

  useEffect(() => {
    const detectAndSetCity = async () => {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      try {
        const result = await request(permission);

        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          Geolocation.getCurrentPosition(
            async position => {
              try {
                const {latitude, longitude} = position.coords;
                const res = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
                  {
                    headers: {
                      'Accept-Language': 'en',
                      'User-Agent': 'JobsApp/1.0',
                    },
                  },
                );
                if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);
                const data = await res.json();
                const city =
                  data?.address?.city ||
                  data?.address?.town ||
                  data?.address?.village ||
                  data?.address?.county ||
                  data?.address?.state_district ||
                  data?.address?.state;

                if (city) {
                  setSelectedCity(city);
                }
              } catch (e) {
                console.log('Reverse geocode error:', e);
              }
            },
            error => console.log('Geolocation error:', error),
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 60000},
          );
        }
      } catch (error) {
        console.log('Location permission request error:', error);
      }
    };

    detectAndSetCity();
  }, []);

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
    queryKey: ['jobs', '', selectedFilters],
    queryFn: getJobList,
    getNextPageParam: lastPage => {
      const current = lastPage.pagination.currentPage;
      const total = lastPage.pagination.totalPages;

      return current < total ? current + 1 : undefined;
    },
  });

  const jobs = data?.pages?.flatMap(page => page.data) ?? [];

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const {
    data: searchData,
    isLoading: isSearchLoading,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useInfiniteQuery({
    queryKey: ['jobsSearch', debouncedSearchQuery, null],
    queryFn: getJobList,
    enabled: isSearchVisible && debouncedSearchQuery.length > 0,
    getNextPageParam: lastPage => {
      const current = lastPage.pagination.currentPage;
      const total = lastPage.pagination.totalPages;

      return current < total ? current + 1 : undefined;
    },
  });

  const searchJobs = searchData?.pages?.flatMap(page => page.data) ?? [];

  const handleShowResults = filters => {
    setSelectedFilters(filters);
    setIsFilterVisible(false);
    setFilterCategoryId(null);
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  // Chips: all SIDEBAR_DATA except location
  const filterChips = SIDEBAR_DATA.filter(s => s.id !== 'location');

  const openFilterOnCategory = categoryId => {
    setFilterCategoryId(categoryId);
    setIsFilterVisible(true);
  };

  const hasAnyFilter = Object.keys(selectedFilters).some(
    k => selectedFilters[k]?.length > 0,
  );

  return (
    <View style={styles.root}>
      <CHeader
        drawer
        openDrawer={openDrawer}
        options={{
          customLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsFilterVisible(true)}
              style={styles.headerLocationBtn}>
              <Icon
                type={Icons.Ionicons}
                name="location"
                size={16}
                color={color.black}
              />
              <Text
                style={
                  selectedCity
                    ? styles.headerCityText
                    : styles.headerCityPlaceholder
                }>
                {selectedCity || 'Search location...'}
              </Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsSearchVisible(true)}
                style={styles.headerSearchBtn}>
                <Icon
                  type={Icons.Ionicons}
                  name="search"
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

      <View style={styles.filterBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setFilterCategoryId(null);
            setIsFilterVisible(true);
          }}
          style={[
            styles.filterIconBtn,
            hasAnyFilter && styles.filterIconBtnActive,
          ]}>
          <Icon
            type={Icons.Ionicons}
            name="options-outline"
            size={16}
            color={hasAnyFilter ? color.primary : color.black}
          />
          <Text
            style={[
              styles.filterIconText,
              hasAnyFilter && styles.filterIconTextActive,
            ]}>
            Filter
          </Text>
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterChipsContent}>
          {filterChips.map(chip => {
            const count = (selectedFilters[chip.id] || []).length;
            const isActive = count > 0;
            return (
              <TouchableOpacity
                key={chip.id}
                activeOpacity={0.7}
                onPress={() => openFilterOnCategory(chip.id)}
                style={[
                  styles.filterChip,
                  isActive && styles.filterChipActive,
                ]}>
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive,
                  ]}>
                  {chip.title.replace('_', ' ')}
                  {isActive ? ` (${count})` : ''}
                </Text>
                <Icon
                  type={Icons.Ionicons}
                  name="chevron-down"
                  size={13}
                  color={isActive ? color.primary : color.black}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ReactNativeModal
        isVisible={isSearchVisible}
        onBackdropPress={() => setIsSearchVisible(false)}
        onBackButtonPress={() => setIsSearchVisible(false)}
        style={styles.searchModal}
        statusBarTranslucent
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={styles.searchModalContainer}>
          <View style={styles.searchHeader}>
            <TouchableOpacity
              onPress={() => {
                setIsSearchVisible(false);
                setSearchQuery('');
              }}
              style={styles.searchBackBtn}>
              <Icon
                type={Icons.Ionicons}
                name="arrow-back"
                size={24}
                color={color.black}
              />
            </TouchableOpacity>
            <View style={styles.searchInputContainer}>
              <Icon
                type={Icons.Ionicons}
                name="search"
                size={20}
                color={color.gray900}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search jobs, company..."
                placeholderTextColor={color.gray900}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Icon
                    type={Icons.Ionicons}
                    name="close-circle"
                    size={20}
                    color={color.gray900}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <FlatList
            data={searchJobs}
            keyExtractor={(item, index) => item.job_id || index.toString()}
            renderItem={({item}) => (
              <JobCard item={item} toggleSaveJob={handleToggleSaveJob} />
            )}
            contentContainerStyle={styles.searchContentContainer}
            onEndReached={() => {
              if (hasNextSearchPage && !isFetchingNextSearchPage) {
                fetchNextSearchPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isSearchLoading || isFetchingNextSearchPage ? (
                <ActivityIndicator />
              ) : null
            }
            ListEmptyComponent={
              !isSearchLoading && debouncedSearchQuery.length > 0 ? (
                <View style={styles.emptySearchCont}>
                  <Text style={styles.emptySearchText}>
                    No jobs found matching "{debouncedSearchQuery}"
                  </Text>
                </View>
              ) : null
            }
          />
        </View>
      </ReactNativeModal>

      <ReactNativeModal
        isVisible={isFilterVisible}
        onBackdropPress={() => setIsFilterVisible(false)}
        onBackButtonPress={() => setIsFilterVisible(false)}
        statusBarTranslucent
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.filterModal}>
        <View style={styles.filterSheet}>
          <View style={styles.filterCloseRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsFilterVisible(false)}
              style={styles.closeIcon}>
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
            initialCategoryId={filterCategoryId}
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
          contentContainerStyle={[
            styles.contentContainerStyle,
            jobs?.length === 0 && {flexGrow: 1},
          ]}
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
          ListEmptyComponent={
            !isLoading ? (
              <View style={styles.emptyStateContainer}>
                <View style={styles.emptyStateIconCont}>
                  <Icon
                    type={Icons.Feather}
                    name="search"
                    size={36}
                    color={color.black}
                  />
                </View>
                <Text style={styles.emptyStateTitle}>No matching jobs</Text>
                <Text style={styles.emptyStateDesc}>
                  We couldn't find any jobs matching your criteria. Try
                  adjusting your filters or search terms.
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.emptyStateBtn}
                  onPress={handleClearFilters}>
                  <Icon
                    type={Icons.Ionicons}
                    name="refresh"
                    size={18}
                    color={color.white}
                  />
                  <Text style={styles.emptyStateBtnText}>Reset Filters</Text>
                </TouchableOpacity>
              </View>
            ) : null
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
            ItemSeparatorComponent={<View style={styles.itemSeparator} />}
          />
        </View>
      </Popover>
    </View>
  );
};

export default Dashboard;
