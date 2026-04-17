import {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import {View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useFocusEffect} from '@react-navigation/native';
import CInput from '@components/CInput';
import CAutoComplete from '@components/CAutoComplete';
import DropDownList from '@components/DropDownList';
import useGlobalStore from '@zustand/store';
import {zodResolver} from '@hookform/resolvers/zod';
import {AddressFormSchema} from '@zod/validationSchema';
import {categoryListApi} from '@apis/ApiRoutes/BusinessRegisterApi';
import GetStyle from './styles';

const BusinessAddress = forwardRef((props, ref) => {
  const styles = GetStyle();
  const [categoryData, setCategoryData] = useState([]);

  const {control, trigger, reset, watch, setValue} = useForm({
    mode: 'onChange',
    resolver: zodResolver(AddressFormSchema),
  });

  const categoryApi = async () => {
    const response = await categoryListApi();
    if (response?.success) {
      setCategoryData(response?.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      categoryApi();
      const savedBusinessData = useGlobalStore.getState().businessLegalFormData;
      if (!savedBusinessData) return;
      setTimeout(() => {
        reset(savedBusinessData);
      }, 0);
    }, [reset]),
  );

  useImperativeHandle(ref, () => ({
    validate: async () => {
      const isValid = await trigger();
      if (isValid) {
        const formData = watch();
        const prevData = useGlobalStore.getState().businessLegalFormData || {};
        const data = {
          ...prevData,
          ...formData,
        };
        await useGlobalStore.getState().setBusinessLegalFormData({
          ...prevData,
          ...data,
        });
      }
      return isValid;
    },
  }));

  return (
    <View style={styles.mainView}>
      <Controller
        name="addressLine1"
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <CInput
            label="Address Line"
            required
            placeholder="Enter Your Block No. & Building Name"
            value={value}
            onChangeText={onChange}
            errorMsg={error?.message}
          />
        )}
      />
      <Controller
        name="addressLine2"
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <CInput
            label="Landmark"
            placeholder="Enter Landmark Details"
            value={value}
            onChangeText={onChange}
            errorMsg={error?.message}
            selection={{start: 0, end: 0}}
          />
        )}
      />
      <Controller
        name="area"
        control={control}
        defaultValue={null}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <CAutoComplete
            required
            label="Area"
            placeholder="Enter Area"
            value={value}
            onSelect={item => {
              onChange(item?.area_name || item?.city_name);
              setValue('area', item?.area_name || item?.city_name);
              setValue('city', item?.city_name);
              setValue('state', item?.state_name);
              setValue('place_id', item?.place_id);
            }}
            errorMsg={error?.message}
          />
        )}
      />
      <View style={styles.cityInputStyle}>
        <View style={styles.inputStyle}>
          <Controller
            name="city"
            control={control}
            defaultValue={null}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <CInput
                label="City"
                required
                editable={false}
                placeholder="City"
                value={value}
                errorMsg={error?.message}
              />
            )}
          />
        </View>

        <View style={styles.inputStyle}>
          <Controller
            name="state"
            control={control}
            defaultValue={null}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <CInput
                label="state"
                required
                editable={false}
                placeholder="State"
                value={value}
                errorMsg={error?.message}
              />
            )}
          />
        </View>
      </View>

      <Controller
        name="main_category_id"
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <DropDownList
            required
            label="Business Category"
            labelProp="main_category_name"
            valueProp="main_category_id"
            placeholder="Select Business Category"
            data={categoryData}
            onChange={onChange}
            value={value}
            errorMsg={error?.message}
          />
        )}
      />
    </View>
  );
});
export default BusinessAddress;
