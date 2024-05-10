// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
} from "@tabler/icons-react";

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const reports = {
  id: "utilities",
  title: "Reports",
  type: "group",
  children: [
    {
      id: "util-typography",
      title: "Orders",
      type: "item",
      url: "/utils/util-typography",
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
  ],
};

export default reports;
