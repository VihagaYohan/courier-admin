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

const utilities = {
  id: "utilities",
  title: "Users",
  type: "group",
  children: [
    {
      id: "util-typography",
      title: "Clients",
      type: "item",
      url: "/utils/util-typography",
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
    {
      id: "util-color",
      title: "Riders",
      type: "item",
      url: "/utils/util-color",
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
  ],
};

export default utilities;
