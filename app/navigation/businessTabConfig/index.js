/* eslint-disable react-native/no-inline-styles */
import CImage from '@components/CImage';
import Icon, {Icons} from '@config/Icons';
import {CustomIcon} from '@config/LoadIcons';
import {getImageUrl} from '@utils/commonFunction';

export const businessTabConfig = branchData => [
  {
    name: 'BusinessDiscover',
    label: 'Dashboard',
    icon: (isFocused, color) => (
      <Icon
        type={Icons.Ionicons}
        name={isFocused ? 'grid' : 'grid-outline'}
        style={{color, fontSize: 22}}
      />
    ),
  },
  {
    name: 'ManageJob',
    label: 'ManageJob',
    icon: (isFocused, color) => (
      <Icon
        type={Icons.Feather}
        name="briefcase"
        style={{color, fontSize: 22}}
      />
    ),
  },
  {
    name: 'PostJob',
    label: 'PostJob',
    icon: (isFocused, color) => (
      <Icon type={Icons.Feather} name="plus" style={{color, fontSize: 26}} />
    ),
  },
  {
    name: 'Applicants',
    label: 'Applicants',
    icon: (isFocused, color) => (
      <Icon type={Icons.Feather} name="users" style={{color, fontSize: 22}} />
    ),
  },
  {
    name: 'BusinessProfile',
    label: 'Profile',
    enableLongPress: true,
    icon: (isFocused, color) =>
      branchData?.branch_logo ? (
        <CImage
          src={getImageUrl(branchData?.branch_logo)}
          resizeMode="cover"
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            borderWidth: isFocused ? 1 : 0,
            borderColor: color,
          }}
        />
      ) : (
        <CustomIcon name="user" style={{color, fontSize: 22}} />
      ),
  },
];
