import { SectionItem } from "@/layouts/Dashboard/Sidebar/Sections";
import { IMenu, IPermission } from "@/types/permisstion";
import { AdminPanelSettings, Build, CardMembership, Groups, HomeOutlined, List, PermContactCalendar, PostAdd, PriceChange, SvgIconComponent, Museum, Event, Collections, Palette, Image } from "@mui/icons-material";

export const iconMap: Record<string, SvgIconComponent> = {
    HomeOutlined,
    PostAdd,
    PriceChange,
    PermContactCalendar,
    CardMembership,
    AdminPanelSettings,
    Build,
    List,
    Groups,
    Museum,
    Event,
    Collections,
    Palette,
    Image
}

export const mapMenuToSectionItems = (menus: IMenu[]): SectionItem[] => {
  return menus.map((menu) => ({
    title: menu.name,
    path: menu.path ?? '',
    icon: menu.icon ? iconMap[menu.icon] : undefined,
    children: menu.children ? mapMenuToSectionItems(menu.children) : undefined,
  }));
};

export const mapPermissionsToSectionItems = (group: IPermission): SectionItem[] => {
    return mapMenuToSectionItems(group.permissions) 
};