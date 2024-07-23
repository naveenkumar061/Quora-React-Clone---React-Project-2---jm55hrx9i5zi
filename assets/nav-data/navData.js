import HomeIcon from '../nav-icons/HomeIcon';
import FollowingIcon from '../nav-icons/FollowingIcon';
import AnswerIcon from '../nav-icons/AnswerIcon';
import SpacesIcon from '../nav-icons/SpacesIcon';
import NotificationIcon from '../nav-icons/NotificationIcon';

import HomeIconFilled from '../nav-icons-filled/HomeIconFilled';
import FollowingIconFilled from '../nav-icons-filled/FollowingIconFilled';
import AnswerIconFilled from '../nav-icons-filled/AnswerIconFilled';
import SpacesIconFilled from '../nav-icons-filled/SpacesIconFilled';
import NotificationIconFilled from '../nav-icons-filled/NotificationIconFilled';

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
