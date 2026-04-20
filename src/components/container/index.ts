/*
 * @Author: mkRui
 * @Date: 2021-09-28 10:32:12
 * @LastEditTime: 2021-09-28 15:25:59
 */
import React from 'react';

import Aside from './view/aside';
import LayoutBase, {
    BasicProps as LayoutProps,
    Header,
    Main,
    ContentBase,
    ContentFooter,
    ContentHeader,
    ContentMain,
    ContentLayout
} from './view/main';

/**
 * 布局组件类型定义
 */
interface LayoutType extends React.FC<LayoutProps> {
    Header: typeof Header;
    Main: typeof Main;
    Aside: typeof Aside;
}

interface ContentType extends React.FC<LayoutProps> {
    Header: typeof ContentHeader;
    Main: typeof ContentMain;
    Footer: typeof ContentFooter;
    Layout: typeof ContentLayout;
}

// 创建主布局组件
const Layout = LayoutBase as LayoutType;
Layout.Header = Header;
Layout.Main = Main;
Layout.Aside = Aside;

// 创建内容区域组件
const Content = ContentBase as ContentType;
Content.Header = ContentHeader;
Content.Main = ContentMain;
Content.Footer = ContentFooter;
Content.Layout = ContentLayout;

// 导出主要组件
export { Aside, Header, Main, Content };
export type { LayoutProps };

// 默认导出Layout组件
export default Layout;
