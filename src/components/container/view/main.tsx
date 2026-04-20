/*
 * @Author: mkRui
 * @Date: 2021-09-28 10:32:02
 * @LastEditTime: 2021-09-28 15:35:41
 */
import ClassNames from 'classnames';
import React, { FC, useState, useMemo } from 'react';
import { LayoutContext, LayoutContextProps, TAG_NAME } from '../context/layout-context';

import Styles from '../style/main.module.less';

export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
    styleName?: string;
}

interface BasePropTag extends BasicProps {
    tag: TAG_NAME;
}

interface MainProp {
    tag: string;
    styleName: string;
}

const BaseLayout: FC<BasePropTag> = (props) => {
    const [sideShow, setShowSwitch] = useState<boolean>(false);

    const { tag: Tag, children, className, ...others } = props;

    const contextValue = useMemo((): LayoutContextProps => ({
        sideShow,
        sideHook: {
            showSide: (bol: boolean) => setShowSwitch(bol)
        }
    }), [sideShow]);

    const styleName = ClassNames(className, {
        [`${Styles['side-layout']}`]: sideShow
    });

    return (
        <LayoutContext.Provider value={contextValue}>
            <Tag className={styleName} {...others}>
                {children}
            </Tag>
        </LayoutContext.Provider>
    );
};

const Base: FC<BasePropTag> = (props) => {
    const { className, children, tag, ...others } = props;
    return React.createElement(tag, { className, ...others }, children);
};

const CreateLayout = ({ tag, styleName }: MainProp) => {
    return (BaseComponent: any) => {
        const Base: FC<BasicProps> = (props) => {
            const style = ClassNames(Styles[styleName], props.className);
            return <BaseComponent {...props} tag={tag} className={style} />;
        };
        return Base;
    };
};

const Layout = CreateLayout({
    tag: TAG_NAME.SECTION,
    styleName: 'layout'
})(BaseLayout);

const Header = CreateLayout({
    tag: TAG_NAME.HEADER,
    styleName: 'header'
})(Base);

const Main = CreateLayout({
    tag: TAG_NAME.MAIN,
    styleName: 'main'
})(Base);

const ContentBase = CreateLayout({
    tag: TAG_NAME.MAIN,
    styleName: 'content'
})(Base);

const ContentMain = CreateLayout({
    tag: TAG_NAME.MAIN,
    styleName: 'content-main'
})(Base);

const ContentHeader = CreateLayout({
    tag: TAG_NAME.HEADER,
    styleName: 'content-header'
})(Base);

const ContentFooter = CreateLayout({
    tag: TAG_NAME.FOOTER,
    styleName: 'content-footer'
})(Base);

const ContentLayout = CreateLayout({
    tag: TAG_NAME.SECTION,
    styleName: 'content-layout'
})(Base);

export {
    Header,
    Main,
    ContentBase,
    ContentFooter,
    ContentMain,
    ContentHeader,
    ContentLayout
};

export default Layout;
