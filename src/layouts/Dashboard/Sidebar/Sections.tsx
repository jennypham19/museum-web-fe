import { TFunction } from 'i18next';

import type { SvgIconComponent } from '@mui/icons-material';
import { CardMembership, HomeOutlined, PeopleOutline, PeopleOutlined, PermContactCalendar, PostAdd, PriceChange } from '@mui/icons-material';

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
