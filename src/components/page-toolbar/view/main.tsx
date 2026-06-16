import ClassNames from "classnames";
import { FC, ReactNode } from "react";

import Styles from "../styles/main.module.less";

export interface FilterFieldProps {
  label: string;
  children: ReactNode;
  width?: number | string;
}

export const FilterField: FC<FilterFieldProps> = ({ label, children, width }) => (
  <div className={Styles.field} style={width ? { width } : undefined}>
    <div className={Styles.label}>{label}</div>
    {children}
  </div>
);

export interface PageToolbarProps {
  filters?: ReactNode;
  actions?: ReactNode;
  variant?: "header" | "panel";
  className?: string;
}

const PageToolbar: FC<PageToolbarProps> = (props) => {
  const { filters, actions, variant = "header", className } = props;

  const content = (
    <div
      className={ClassNames(Styles.toolbar, className, {
        [Styles.toolbarActionsOnly]: !filters && !!actions,
      })}
    >
      {filters ? <div className={Styles.filters}>{filters}</div> : null}
      {actions ? <div className={Styles.actions}>{actions}</div> : null}
    </div>
  );

  if (variant === "panel") {
    return <div className="theme-panel p-6 mb-4">{content}</div>;
  }

  return content;
};

export default PageToolbar;
