import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Popover from 'react-native-popover-view';
import {CHeader} from '@components/CHeader';
import {useThemeContext} from '@contexts/themeContext';
import Icon, {Icons} from '@config/Icons';
import {creditTypes} from '@config/staticData';
import {useCreditBalance, useCreditHistory} from '@apis/ApiRoutes/Business';
import GetStyles from './styles';

const Credits = () => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const [filter, setFilter] = useState(creditTypes[0]);
  const filterBtnRef = useRef(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const closePopover = () => setPopoverAnchor(null);

  const handleFilterSelect = selectedOption => {
    setFilter(selectedOption);
    closePopover();
  };

  const {data: balanceData, isLoading: isBalanceLoading} = useCreditBalance();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useCreditHistory(filter?.value);

  const transactions = data?.pages.flatMap(page => page.transactions) || [];

  const totalTransactions = data?.pages[0]?.pagination?.total || 0;

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderTransaction = ({item}) => {
    const isUsage = item.type === 'USAGE';

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.badge,
              isUsage ? styles.badgeUsage : styles.badgePurchase,
            ]}>
            <Icon
              type={Icons.Feather}
              name={isUsage ? 'arrow-down' : 'arrow-up'}
              size={16}
              color={isUsage ? color.orange : color.green}
            />
            <Text
              style={[
                styles.badgeText,
                isUsage ? styles.textUsage : styles.textPurchase,
              ]}>
              {item?.type}
            </Text>
          </View>

          <Text
            style={[
              styles.creditText,
              isUsage ? styles.textUsage : styles.textPurchase,
            ]}>
            {item.credits > 0 ? `+${item.credits}` : item.credits}
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.title} numberOfLines={2}>
            {item?.description}
          </Text>
          <Text style={styles.refText} numberOfLines={1}>
            Ref: {item?.reference_id}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.dateText}>{item?.perfect_time}</Text>

          <View style={styles.actionContainer}>
            {item?.amount_rupees && (
              <Text style={styles.amountText}>
                ₹{(item?.amount_rupees).toFixed(0)}
              </Text>
            )}
            {item?.invoice_pdf && (
              <TouchableOpacity activeOpacity={0.7} style={styles.invoiceBtn}>
                <Icon
                  type={Icons.Feather}
                  name="file-text"
                  size={14}
                  color={color.black}
                />
                <Text style={styles.invoiceText}>Invoice</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.root}>
      <CHeader title="Credits" back />
      {!isBalanceLoading && (
        <View style={styles.summaryCard}>
          <Text style={styles.balanceLabel}>Available Credits</Text>
          <Text style={styles.balanceValue}>{balanceData?.balance ?? 0} </Text>
        </View>
      )}

      <View style={styles.screenHeader}>
        <View>
          <Text style={styles.screenTitle}>Transaction History</Text>
          <Text style={styles.screenSubtitle}>
            {totalTransactions} transactions found
          </Text>
        </View>

        <TouchableOpacity
          ref={filterBtnRef}
          activeOpacity={0.7}
          style={styles.filterBtn}
          onPress={() => setPopoverAnchor(filterBtnRef)}>
          <Text style={styles.filterText}>{filter?.label}</Text>
          <Icon
            type={Icons.Feather}
            name="chevron-down"
            size={16}
            color={color.black}
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.emptyComponeemptyComponentnt}>
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={item => item.transaction_id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshing={isRefetching}
            onRefresh={refetch}
            ListEmptyComponent={
              <View style={styles.emptyComponent}>
                <Text style={styles.emptyText}>No transactions found</Text>/
              </View>
            }
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator color={color.primary} />
              ) : null
            }
          />
        </View>
      )}
      <Popover
        isVisible={!!popoverAnchor}
        from={popoverAnchor}
        onRequestClose={closePopover}
        popoverStyle={styles.popoverStyle}
        arrowSize={{width: 0, height: 0}}>
        <View style={styles.popoverInnerContainer}>
          {creditTypes.map(option => {
            const isActive = filter === option;

            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.7}
                style={styles.popoverRow}
                onPress={() => handleFilterSelect(option)}>
                <Text
                  style={[
                    styles.popoverText,
                    isActive && styles.popoverTextActive,
                  ]}>
                  {option?.label}
                </Text>
                <View style={styles.popoverIconContainer}>
                  {isActive && (
                    <Icon
                      type={Icons.Feather}
                      name="check"
                      size={20}
                      color={color.blue}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Popover>
    </View>
  );
};

export default Credits;
