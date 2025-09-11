import { TFunction } from 'i18next';

import type { SvgIconComponent } from '@mui/icons-material';
import { AdminPanelSettings, Build, CardMembership, Groups, HomeOutlined, List, PeopleOutline, PeopleOutlined, PermContactCalendar, PostAdd, PriceChange, Settings } from '@mui/icons-material';

import { ROUTE_PATH } from '@/constants/routes';
import { IUser } from '@/types/user';
import { IPermission } from '@/types/permisstion';
import { mapPermissionsToSectionItems } from '@/utils/data';

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

const Sections = (menuData: IPermission | null): Section[] => {
  const sectionItems = menuData ? mapPermissionsToSectionItems(menuData) : [];
  let accountItem: SectionItem[] = sectionItems

  return [
    {
      section: null,
      items: accountItem
    }
  ]
};

export default Sections;
