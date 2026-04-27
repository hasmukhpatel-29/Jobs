import Icon, {Icons} from '@config/Icons';
import {CustomIcon} from '@config/LoadIcons';

export const userTabConfig = [
  {
    name: 'Dashboard',
    label: 'Home',
    icon: (isFocused, color) => (
      <Icon
        type={Icons.Ionicons}
        name={isFocused ? 'home' : 'home-outline'}
        style={{color, fontSize: 22}}
      />
    ),
  },
  {
    name: 'Favourites',
    label: 'Favourites',
    icon: (isFocused, color) => (
      <CustomIcon
        name={isFocused ? 'likeFilled' : 'like'}
        style={{color, fontSize: 22}}
      />
    ),
  },
  {
    name: 'Profile',
    label: 'Profile',
    icon: (isFocused, color) => (
      <CustomIcon
        name={isFocused ? 'user' : 'userProfile'}
        style={{color, fontSize: 22}}
      />
    ),
  },
];
