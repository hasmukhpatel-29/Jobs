import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Platform,
} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {useQuery} from '@tanstack/react-query';
import Toast from '@components/CToast';
import {CButton} from '@components/CButton';
import {getPopularJobCategories} from '@apis/ApiRoutes/JobsApi';
import {SIDEBAR_DATA, OPTIONS_DATA} from '@config/staticData';
import Icon, {Icons} from '@config/Icons';
import {autoCompleteCity} from '@apis/ApiRoutes/LoginApi';
import {useThemeContext} from '@contexts/themeContext';
import useGlobalStore from '@zustand/store';
import GetStyles from './styles';

const JobFilter = ({
  initialFilters = {},
  initialCategoryId = null,
  onShowResults = () => {},
  onClearAll = () => {},
  onClose = () => {},
}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const [activeCategoryId, setActiveCategoryId] = useState(
    initialCategoryId || SIDEBAR_DATA[0].id,
  );
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  const {selectedCity, setSelectedCity} = useGlobalStore();
  const [locationQuery, setLocationQuery] = useState('');
  const [locationResults, setLocationResults] = useState([]);
  const [isLocLoading, setIsLocLoading] = useState(false);
  const [isLocatingMe, setIsLocatingMe] = useState(false);

  const {data: popularCategoriesData, isLoading: isCategoriesLoading} =
    useQuery({
      queryKey: ['popularJobCategories'],
      queryFn: getPopularJobCategories,
    });

  useEffect(() => {
    setSelectedFilters(initialFilters);
    // Pre-fill location input with the current city from store or initialFilters
    setLocationQuery(initialFilters?.city || selectedCity || '');
  }, [initialFilters]);

  const handleLocationSearch = async text => {
    setLocationQuery(text);
    if (text.length > 2) {
      setIsLocLoading(true);
      try {
        const res = await autoCompleteCity({input: text});
        if (res?.success) {
          setLocationResults(res?.cities || []);
        }
      } catch (error) {
        console.log('Location Search Error:', error);
      } finally {
        setIsLocLoading(false);
      }
    } else {
      setLocationResults([]);
    }
  };

  const handleGetCurrentLocation = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    try {
      const result = await request(permission);

      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        setIsLocatingMe(true);
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
              console.info('🚀 ~ handleGetCurrentLocation ~ city:', city);

              if (city) {
                onSelectLocation(city);
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Could not determine your city.',
                });
              }
            } catch (e) {
              console.error('Reverse geocode error:', e?.message || e);
              Toast.show({type: 'error', text1: 'Failed to fetch city name.'});
            } finally {
              setIsLocatingMe(false);
            }
          },
          error => {
            console.log('Geolocation error:', error);
            Toast.show({type: 'error', text1: 'Unable to get your location.'});
            setIsLocatingMe(false);
          },
          {enableHighAccuracy: true, timeout: 10000, maximumAge: 60000},
        );
      } else if (result === RESULTS.BLOCKED) {
        Toast.show({
          type: 'error',
          text1: 'Location permission blocked. Enable it in Settings.',
        });
      } else if (result === RESULTS.DENIED) {
        Toast.show({type: 'error', text1: 'Location permission denied.'});
      }
    } catch (error) {
      console.log('Permission request error:', error);
      Toast.show({type: 'error', text1: 'Something went wrong.'});
    }
  };

  const onSelectLocation = city => {
    setSelectedFilters(prev => ({...prev, city: city}));
    setLocationQuery(city);
    setLocationResults([]);
  };

  const toggleFilter = (sectionId, optionId) => {
    setSelectedFilters(prev => {
      const sectionFilters = prev[sectionId] || [];
      const isSelected = sectionFilters.includes(optionId);

      let newSectionFilters;
      if (sectionId === 'job_category') {
        // Single selection for job category
        newSectionFilters = isSelected ? [] : [optionId];
      } else {
        // Multi selection for others
        newSectionFilters = isSelected
          ? sectionFilters.filter(id => id !== optionId)
          : [...sectionFilters, optionId];
      }

      return {
        ...prev,
        [sectionId]: newSectionFilters,
      };
    });
  };

  const clearAll = () => {
    setSelectedFilters({});
    onClearAll();
  };

  const getSelectedCountForCategory = categoryId => {
    return (selectedFilters[categoryId] || []).length;
  };

  const getTotalSelectedCount = () => {
    return Object.values(selectedFilters).reduce(
      (acc, curr) => acc + curr.length,
      0,
    );
  };

  const activeCategory = SIDEBAR_DATA.find(cat => cat.id === activeCategoryId);

  const renderLocationContent = () => (
    <View>
      <View style={styles.locationSearchContainer}>
        <View style={styles.locationInputWrapper}>
          <Icon type={Icons.Ionicons} name="search" size={20} color="#94A3B8" />
          <TextInput
            style={styles.locationInput}
            placeholder="Search city..."
            value={locationQuery}
            onChangeText={handleLocationSearch}
          />
          {locationQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setLocationQuery('');
                setLocationResults([]);
                setSelectedFilters(prev => {
                  const next = {...prev};
                  delete next.city;
                  return next;
                });
              }}>
              <Icon
                type={Icons.Ionicons}
                name="close-circle"
                size={20}
                color={color.black}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isLocLoading ? (
        <ActivityIndicator size="small" style={{marginTop: 20}} />
      ) : locationResults.length > 0 ? (
        <View>
          {locationResults.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.locationResultItem}
              onPress={() => onSelectLocation(item.city_name)}>
              <Icon
                type={Icons.Ionicons}
                name="location-outline"
                size={20}
                color={color.black}
              />
              <Text style={styles.locationResultText}>
                {item.city_name}
                {item.state_name ? `, ${item.state_name}` : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={styles.currentLocationBtn}
            onPress={handleGetCurrentLocation}
            disabled={isLocatingMe}>
            <View style={styles.currentLocationIcon}>
              {isLocatingMe ? (
                <ActivityIndicator size="small" color={color.green} />
              ) : (
                <Icon
                  type={Icons.MaterialIcons}
                  name="my-location"
                  size={20}
                  color={color.green}
                />
              )}
            </View>
            <View style={styles.currentLocationContent}>
              <Text style={styles.currentLocationTitle}>
                {isLocatingMe
                  ? 'Detecting location...'
                  : 'Use Current Location'}
              </Text>
            </View>
            {!isLocatingMe && (
              <Icon
                type={Icons.Ionicons}
                name="chevron-forward"
                size={18}
                color={color.green}
              />
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  let currentOptions = [];
  if (activeCategoryId === 'job_category') {
    if (popularCategoriesData?.data) {
      currentOptions = popularCategoriesData.data.map(cat => ({
        id: cat.job_category_id,
        label: `${cat.job_category_name} (${cat.application_count})`,
      }));
    } else {
      currentOptions = OPTIONS_DATA[activeCategoryId] || [];
    }
  } else {
    currentOptions = OPTIONS_DATA[activeCategoryId] || [];
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filters and sorting</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={clearAll}>
          <Text style={styles.clearAllText}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.sidebar}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {SIDEBAR_DATA.map(category => {
              const count =
                category.id === 'location'
                  ? selectedFilters.city
                    ? 1
                    : 0
                  : getSelectedCountForCategory(category.id);
              const isActive = activeCategoryId === category.id;

              return (
                <TouchableOpacity
                  key={category.id}
                  activeOpacity={0.7}
                  onPress={() => setActiveCategoryId(category.id)}
                  style={[
                    styles.sidebarItem,
                    isActive && styles.activeSidebarItem,
                  ]}>
                  {isActive && <View style={styles.sidebarIndicator} />}
                  <View style={styles.sidebarLabelContainer}>
                    <Text
                      style={[
                        styles.sidebarLabel,
                        isActive && styles.activeSidebarLabel,
                      ]}>
                      {category.title}
                    </Text>
                    {count > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{count}</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
          <ScrollView contentContainerStyle={styles.sectionContent}>
            <Text style={styles.sectionTitle}>{activeCategory.title}</Text>
            {activeCategoryId === 'job_category' && isCategoriesLoading ? (
              <ActivityIndicator size="small" style={{marginTop: 20}} />
            ) : activeCategoryId === 'location' ? (
              renderLocationContent()
            ) : (
              <View style={styles.optionsGrid}>
                {currentOptions.map(option => {
                  const isSelected = (
                    selectedFilters[activeCategoryId] || []
                  ).includes(option.id);

                  return (
                    <TouchableOpacity
                      key={option.id}
                      activeOpacity={0.7}
                      onPress={() => toggleFilter(activeCategoryId, option.id)}
                      style={[styles.chip, isSelected && styles.activeChip]}>
                      <Text
                        style={[
                          styles.chipLabel,
                          isSelected && styles.activeChipLabel,
                        ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <CButton
          label="Close"
          linkBtn
          onPress={onClose}
          buttonStyle={styles.closeButton}
          buttonLabelStyle={styles.closeButtonText}
        />
        <CButton
          label={`Show results ${
            getTotalSelectedCount() > 0 ? `(${getTotalSelectedCount()})` : ''
          }`}
          onPress={() => {
            if (selectedFilters.city) {
              setSelectedCity(selectedFilters.city);
            } else {
              // City was cleared — reset selectedCity in store
              setSelectedCity('');
            }
            setLocationQuery('');
            onShowResults(selectedFilters);
          }}
          buttonStyle={styles.applyButton}
          buttonLabelStyle={styles.applyButtonText}
        />
      </View>
    </View>
  );
};

export default JobFilter;
