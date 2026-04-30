/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import CInput from '@components/CInput';
import {autoCompleteCity} from '@apis/ApiRoutes/LoginApi';
import GetStyles from './styles';

const Separator = ({style}) => <View style={style} />;

const EmptyComponent = ({loading, query, styles}) => {
  if (loading || query.length <= 2) return null;
  return <Text style={styles.emptyText}>No data found.</Text>;
};

const CAutoComplete = ({
  placeholder = 'Search',
  onSelect,
  label,
  value,
  errorMsg,
  required,
  textInputWrapper,
  editable,
  type = 'city',
  direction = 'bottom',
  onChangeTextValue = () => {},
}) => {
  const styles = GetStyles();
  const inputRef = useRef(null);

  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const debounceRef = useRef(null);

  const handleSearch = text => {
    setQuery(text);
    onChangeTextValue?.(text);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (text.length < 2) {
      setData([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setShowDropdown(true);
      setLoading(true);

      try {
        const payload = type === 'degree' ? {query: text} : {input: text};
        const res = await autoCompleteCity(payload, type);

        if (res?.success) {
          setData(res?.businesses || res?.cities || res?.data || []);
        } else {
          setData([]);
        }
      } catch (error) {
        setData([]);
      }

      setLoading(false);
    }, 400);
  };

  const handleSelect = item => {
    const locationText =
      (item?.description || item?.city_name || item?.degree_name || '') +
      (item?.state_name ? `, ${item.state_name}` : '') +
      (item?.country_name ? `, ${item.country_name}` : '');

    setQuery(locationText);
    setData([item]);
    setShowDropdown(false);
    inputRef.current?.blur();
    onSelect?.(item);
  };

  useEffect(() => {
    if (value) {
      setQuery(value);
    } else {
      setQuery('');
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
        <Text style={styles.text}>
          {item?.description || item?.city_name || ''}
          {item?.state_name ? `, ${item?.state_name}` : ''}
          {item?.country_name ? `, ${item?.country_name}` : ''}
          {item?.degree_name}
        </Text>
      </TouchableOpacity>
    ),
    [styles],
  );

  return (
    <View style={{zIndex: 1000}}>
      <CInput
        ref={inputRef}
        required={required}
        label={label}
        placeholder={placeholder}
        value={query}
        onChangeText={handleSearch}
        onFocus={() => {
          if (query.length > 1) setShowDropdown(true);
        }}
        onBlur={() => setShowDropdown(false)}
        errorMsg={errorMsg}
        textInputWrapper={textInputWrapper}
        editable={editable}
      />

      {showDropdown && (
       <View 
          style={[
            styles.mainContainer, 
            direction === 'top' ? { bottom: '100%', marginBottom: 5 } : { top: '100%', marginTop: 5 }
          ]}
        >
          <FlatList
            data={data}
            renderItem={renderItem}
            nestedScrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={<Separator style={styles.separator} />}
            ListEmptyComponent={
              <EmptyComponent loading={loading} query={query} styles={styles} />
            }
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};

export default CAutoComplete;
