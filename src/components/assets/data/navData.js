import AnswerIcon from '../icons/AnswerIcon';
import FollowingIcon from '../icons/FollowingIcon';
import HomeIcon from '../icons/HomeIcon';
import NotificationIcon from '../icons/NotificationIcon';
import SpacesIcon from '../icons/SpacesIcon';
import AnswerIconFilled from '../iconsfd/AnswerIconFilled';
import FollowingIconFilled from '../iconsfd/FollowingIconFilled';
import HomeIconFilled from '../iconsfd/HomeIconFilled';
import NotificationIconFilled from '../iconsfd/NotificationIconFilled';
import SpacesIconFilled from '../iconsfd/SpacesIconFilled';

export const dataNavs = [
  {
    name: 'Home',
    path: '/home',
    icon: <HomeIcon />,
    iconFilled: <HomeIconFilled />,
  },
  {
    name: 'Following',
    path: '/following',
    icon: <FollowingIcon />,
    iconFilled: <FollowingIconFilled />,
  },
  {
    name: 'Answer',
    path: '/answer',
    icon: <AnswerIcon />,
    iconFilled: <AnswerIconFilled />,
  },
  {
    name: 'Spaces',
    path: '/spaces',
    icon: <SpacesIcon />,
    iconFilled: <SpacesIconFilled />,
  },
  {
    name: 'Notifications',
    path: '/notification',
    icon: <NotificationIcon />,
    iconFilled: <NotificationIconFilled />,
  },
];
