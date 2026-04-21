import { FC } from "react";

export interface WorkStatisticsItem {
  label: string;
  value: number;
}

interface WorkStatisticsChartProps {
  title?: string;
  data: WorkStatisticsItem[];
}

const WorkStatisticsChart: FC<WorkStatisticsChartProps> = (props) => {
  const { title, data } = props;
  const max = Math.max(0, ...data.map((d) => d.value));

  return (
    <div className="bg-white rounded shadow p-4">
      {!!title && <div className="text-base font-semibold mb-4">{title}</div>}
      {data.length === 0 ? (
        <div className="text-gray-500">暂无数据</div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.map((item) => {
            const pct = max > 0 ? Math.round((item.value / max) * 100) : 0;
            return (
              <div key={`${item.label}`} className="flex items-center gap-3">
                <div className="w-48 text-sm text-gray-700 truncate" title={item.label}>
                  {item.label}
                </div>
                <div className="flex-1 h-3 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-3 bg-blue-500"
                    style={{ width: `${pct}%`, minWidth: item.value > 0 ? 4 : 0 }}
                  />
                </div>
                <div className="w-16 text-right text-sm text-gray-700">{item.value}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WorkStatisticsChart;

