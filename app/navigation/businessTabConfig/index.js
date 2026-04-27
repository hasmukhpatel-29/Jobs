import Icon, {Icons} from '@config/Icons';
import {CustomIcon} from '@config/LoadIcons';

export const businessTabConfig = [
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
    name: 'BusinessProfile',
    label: 'Profile',
    icon: (isFocused, color) => (
      <CustomIcon
        name="user"
        style={{color, fontSize: 22}}
      />
    ),
  },
];