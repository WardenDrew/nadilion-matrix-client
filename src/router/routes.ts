import type { RouteRecordRaw } from 'vue-router';

import ErrorNotFound from 'views/ErrorNotFound.vue';
import MainLayout from 'views/layouts/MainLayout.vue';

import ServerOverviewToolbar from 'views/toolbars/ServerOverviewToolbar.vue';
import RoomToolbar from 'views/toolbars/RoomToolbar.vue';

import ServerDrawer from 'views/drawers/ServerDrawer.vue';
import UserDrawer from 'views/drawers/UserDrawer.vue';

import ServerOverview from 'views/pages/ServerOverview.vue';
import EmptyHelper from "views/helpers/EmptyHelper.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/s',
    components: {
      default: MainLayout
    },
    children: [
      {
        path: '',
        components: {
          default: ServerOverview,
          header: ServerOverviewToolbar,
          left: ServerDrawer,
          right: UserDrawer,
          footer: EmptyHelper,
        },
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;
