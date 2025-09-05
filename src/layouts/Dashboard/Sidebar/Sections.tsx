import { TFunction } from 'i18next';

import type { SvgIconComponent } from '@mui/icons-material';
import { Build, CardMembership, Groups, HomeOutlined, List, PeopleOutline, PeopleOutlined, PermContactCalendar, PostAdd, PriceChange, Settings } from '@mui/icons-material';

import { ROUTE_PATH } from '@/constants/routes';
import { IUser } from '@/types/user';

export interface SectionItem {
  title: string;
  path: string;
  children?: SectionItem[];
  icon?: SvgIconComponent;
}

interface Section {
  section: string | null;
  items: SectionItem[];
}

const Sections = (profile: IUser | null): Section[] => {
  const employeeMenuItem: SectionItem[] = [
    {
      title: 'Trang chủ',
      path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
      icon: HomeOutlined,
    },
    {
      title: 'Quản lý bài viết',
      path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_BLOG}`,
      icon: PostAdd,
    },
    {
      title: 'Quản lý doanh thu',
      path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_TURNOVER}`,
      icon: PriceChange,
    },
    {
      title: 'Quản lý thông tin',
      path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_INFORMATION}`,
      icon: PermContactCalendar,
    },
    {
      title: 'Quản lý gói thành viên',
      path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_PACKAGE}`,
      icon: CardMembership,
    },
  ]
  const managerMenuItem: SectionItem[] = [
    {
      title: 'Trang chủ',
      path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
      icon: HomeOutlined,
    },
    {
      title: 'Quản lý Bài viết',
      path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_BLOG}`,
      icon: PostAdd,
    },
    {
      title: 'Quản lý doanh thu',
      path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_TURNOVER}`,
      icon: PriceChange,
    },
    {
      title: 'Quản lý thông tin',
      path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_INFORMATION}`,
      icon: PermContactCalendar,
    },
    {
      title: 'Quản lý gói thành viên',
      path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_PACKAGE}`,
      icon: CardMembership,
    },
    {
      title: 'Quản lý chung',
      path: '#',
      icon: Settings,
      children: [
        {
          title: 'Thao tác',
          path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_ACTION}`,
          icon: Build
        },
        {
          title: 'Chức năng',
          path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_MENU}`,
          icon: List
        },
        {
          title: 'Nhóm quyền',
          path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_ROLE}`,
          icon: Groups
        },
      ]
    }
  ]

  const isAdmin = profile?.role.toLowerCase().trim() === 'admin';
  let accountItem: SectionItem[] = isAdmin ? managerMenuItem : employeeMenuItem

  return [
    {
      section: null,
      items: accountItem
    }
  ]
};

export default Sections;
