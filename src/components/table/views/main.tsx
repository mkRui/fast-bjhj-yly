import "../styles/main.less";

import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import { HolderOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "antd";
import {
  FC,
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useResizeObserver } from "react-use-observer";

type MorTablePropsType<T> = Pick<TableProps<T>, keyof TableProps<T>>;

interface MorTableTypes extends MorTablePropsType<any> {
  offset?: number;
  style?: CSSProperties;
  auto?: boolean;
  rowSortable?: boolean;
  rowSortableHandle?: boolean;
  rowSortableHandleWidth?: number;
  onRowSort?: (nextDataSource: any[]) => void;
}

export interface MorTableRef {
  getCurrentDataSource: () => any[];
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: any;
}

const RowContext = createContext<RowContextProps>({});

export const DragHandle: FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

interface SortableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const SortableRow: FC<SortableRowProps> = (props) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: props["data-row-key"],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const MorTable = forwardRef<MorTableRef, MorTableTypes>((props, tableRef) => {
  const {
    scroll,
    style,
    offset = 0,
    auto = false,
    rowSortable = false,
    rowSortableHandle = true,
    rowSortableHandleWidth = 80,
    onRowSort,
    ...resetProps
  } = props;

  const time = useRef<any>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [resizeRef, resizeObserverEntry] = useResizeObserver();

  const [boxHeight, setBoxHeight] = useState(
    resizeObserverEntry.contentRect?.height || 0
  );

  const [innerDataSource, setInnerDataSource] = useState<any[]>(
    Array.isArray(resetProps.dataSource) ? (resetProps.dataSource as any[]) : []
  );

  useEffect(() => {
    if (Array.isArray(resetProps.dataSource)) {
      setInnerDataSource(resetProps.dataSource as any[]);
    }
  }, [resetProps.dataSource]);

  useImperativeHandle(
    tableRef,
    () => ({
      getCurrentDataSource: () => {
        return rowSortable ? innerDataSource : Array.isArray(resetProps.dataSource) ? (resetProps.dataSource as any[]) : [];
      },
    }),
    [rowSortable, innerDataSource, resetProps.dataSource]
  );

  useEffect(() => {
    const { height = 0 } = resizeObserverEntry.contentRect || {};
    if (height !== boxHeight) {
      setBoxHeight(height - 55 - offset);
    }
  });

  const debounced = (): void => {
    clearTimeout(time.current);
    time.current = setTimeout(() => {
      const { height = 0 } = resizeObserverEntry.contentRect || {};
      setBoxHeight(height - 55 - offset);
    }, 300);
  };

  useEffect(() => {
    window.addEventListener("resize", debounced);
    return () => {
      window.removeEventListener("resize", debounced);
    };
  }, []);

  const sortableColumns = useMemo(() => {
    const cols = (resetProps.columns || []) as any[];
    if (!rowSortable) return cols;
    if (!rowSortableHandle) return cols;
    return [
      { key: "__sort", align: "center", width: rowSortableHandleWidth, render: () => <DragHandle /> },
      ...cols,
    ];
  }, [resetProps.columns, rowSortable, rowSortableHandle, rowSortableHandleWidth]);

  const sortableComponents = useMemo(() => {
    if (!rowSortable) return resetProps.components;
    const base = resetProps.components || {};
    const body = (base as any).body || {};
    return { ...base, body: { ...body, row: SortableRow } };
  }, [resetProps.components, rowSortable]);

  const getRowId = (record: any, index: number): string => {
    const rk = resetProps.rowKey as any;
    const raw =
      typeof rk === "function"
        ? rk(record)
        : typeof rk === "string"
          ? record?.[rk]
          : record?.key ?? index;
    return String(raw);
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;
    if (active.id === over.id) return;
    setInnerDataSource((prev) => {
      const activeIndex = prev.findIndex((record, idx) => getRowId(record, idx) === String(active.id));
      const overIndex = prev.findIndex((record, idx) => getRowId(record, idx) === String(over.id));
      if (activeIndex < 0 || overIndex < 0) return prev;
      const next = arrayMove(prev, activeIndex, overIndex);
      onRowSort?.(next);
      return next;
    });
  };

  const tableNode = (
    <Table
      {...resetProps}
      columns={sortableColumns}
      components={sortableComponents}
      dataSource={rowSortable ? innerDataSource : resetProps.dataSource}
      size="small"
      scroll={Object.assign(scroll ?? {}, {
        y: auto ? "100%" : boxHeight,
      })}
    >
      {props.children}
    </Table>
  );

  const sortableTableNode = rowSortable ? (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={innerDataSource.map(getRowId)} strategy={verticalListSortingStrategy}>
        {tableNode}
      </SortableContext>
    </DndContext>
  ) : (
    tableNode
  );

  return (
    <div
      className="mor-table"
      style={style}
      ref={(node) => {
        rootRef.current = node;
        if (typeof resizeRef === "function") resizeRef(node);
        else if (resizeRef && typeof resizeRef === "object") (resizeRef as any).current = node;
      }}
    >
      {sortableTableNode}
    </div>
  );
});

export default MorTable;
