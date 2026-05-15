import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SIDEBAR_DATA, OPTIONS_DATA} from '@config/staticData';
import GetStyles from './styles';
import {CButton} from '@components/CButton';

const JobFilter = ({
  initialFilters = {},
  onShowResults = () => {},
  onClearAll = () => {},
  onClose = () => {},
}) => {
  const styles = GetStyles();
  const [activeCategoryId, setActiveCategoryId] = useState(SIDEBAR_DATA[0].id);
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  useEffect(() => {
    setSelectedFilters(initialFilters);
  }, [initialFilters]);

  const toggleFilter = (sectionId, optionId) => {
    setSelectedFilters(prev => {
      const sectionFilters = prev[sectionId] || [];
      const isSelected = sectionFilters.includes(optionId);

      const newSectionFilters = isSelected
        ? sectionFilters.filter(id => id !== optionId)
        : [...sectionFilters, optionId];

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
  const currentOptions = OPTIONS_DATA[activeCategoryId] || [];

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
              const count = getSelectedCountForCategory(category.id);
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
          onPress={() => onShowResults(selectedFilters)}
          buttonStyle={styles.applyButton}
          buttonLabelStyle={styles.applyButtonText}
        />
      </View>
    </View>
  );
};

export default JobFilter;
