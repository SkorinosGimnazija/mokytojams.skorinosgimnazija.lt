import React from 'react';
import { EditPost } from '../pages/posts/EditPost';
import { ViewPosts } from '../pages/posts/ViewPosts';
import { AuthRole } from '../store/authSlice';

export const routes: RoutesGroup[] = [
  {
    name: 'CMS',
    accessRole: 'Admin',
    routes: [
      {
        name: 'Posts',
        slug: '/posts',
        innerRoutes: [
          {
            slug: '/',
            component: ViewPosts,
          },
          {
            slug: '/create',
            component: EditPost,
          },
          {
            slug: '/edit/:id',
            component: EditPost,
          },
        ],
      },
    ],
  },
];

interface RoutesGroup {
  name: string;
  routes: Route[];
  accessRole: AuthRole;
}

interface Route {
  name: string;
  slug: string;
  innerRoutes: InnerRoute[];
}

interface InnerRoute {
  slug: string;
  component: React.ComponentType;
}
