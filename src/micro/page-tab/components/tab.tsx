import { CloseOutlined } from '@ant-design/icons';
import ClassNames from 'classnames';
import { FC, MouseEvent } from 'react';
import { useNavigate } from "react-router-dom";


import Styles from '../styles/tab.module.less';
interface TabProps {
    title: string;
    path: string;
    active: boolean;
    onClose: (url: string) => void;
}

const Tab: FC<TabProps> = (props) => {
    const { title, path, active, onClose } = props;

    const navigate = useNavigate();


    const container = ClassNames(`${Styles['tab__container']}`, {
        [`${Styles['tab--active']}`]: active
    });

    const handleClose = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        onClose(path);
    };

    const handleClick = () => {
        navigate(path);
    };

    return (
        <span className={container} onClick={handleClick}>
            {/* <em /> */}
            <i>{title}</i>
            <CloseOutlined width={12} height={12} onClick={handleClose} />
        </span>
    );
};

export default Tab;
