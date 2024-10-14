import { Bell, Home, Settings, User } from 'lucide-react';

export const cardData = [
  {
    title: 'Dashboard',
    count: '25',
    subtext: 'Active sessions',
    icon: <Home className="text-blue-500" />,
  },
  {
    title: 'Users',
    count: '102',
    subtext: 'New sign-ups',
    icon: <User className="text-gray-900" />,
  },
  {
    title: 'Settings',
    count: '12',
    subtext: 'Pending configurations',
    icon: <Settings className="text-gray-500" />,
  },
  {
    title: 'Notifications',
    count: '8',
    subtext: 'Unread alerts',
    icon: <Bell className="text-red-500" />,
  },
];
