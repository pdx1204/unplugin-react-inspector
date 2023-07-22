import {
  LazyExoticComponent,
  MemoExoticComponent,
  ComponentType,
  lazy,
} from "react";

import Layout from "@/layouts";

export type RouteType = {
  path?: string;
  index?: boolean;
  component?:
    | LazyExoticComponent<ComponentType<unknown>>
    | MemoExoticComponent<ComponentType>;
  children?: RouteType[];
};

const _import = (path: string) => lazy(() => import(`@/pages${path}`));
export const routes: RouteType[] = [
  {
    path: "*",
    component: _import("/404"),
  },
  {
    path: "/:dynamic",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/[dynamic]"),
      },
    ],
  },
  {
    path: "/about",
    component: _import("/about@"),
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/"),
      },
    ],
  },
  {
    path: "/page1/page1_1/:dynamic",
    component: _import("/page1/page1_1/[dynamic]@"),
  },
  {
    path: "/page1/page1_1",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/page1/page1_1"),
      },
    ],
  },
  {
    path: "/page1/page1_2/1",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/page1/page1_2/1"),
      },
    ],
  },
  {
    path: "/page1/page1_2/2",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/page1/page1_2/2"),
      },
    ],
  },
  {
    path: "/page2/:dynamic",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/page2/[dynamic]"),
      },
    ],
  },
  {
    path: "/page2/about",
    component: _import("/page2/about@"),
  },
];
