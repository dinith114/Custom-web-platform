// NavItem — represents a navigation menu item

export interface NavItem {
  id: string;
  label: string;
  pageId?: string;
  url?: string;
  order: number;
  isVisible: boolean;
  children: NavItem[];
}

export interface NavTree {
  _id: string;
  siteId: string;
  items: NavItem[];
  updatedAt: string;
}

export interface UpdateNavPayload {
  items: NavItem[];
}
