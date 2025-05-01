import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
  } from 'recharts';
  
  interface LikesChartProps {
    data: { name: string; likes: number }[];
  }
  
  export default function LikesChart({ data }: LikesChartProps) {
    return (
      <div className="w-full h-[500px] bg-gray-900 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4">Répartition des likes</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" stroke="#ccc" axisLine={false} tickLine={false} />
            <YAxis
              dataKey="name"
              type="category"
              stroke="#ccc"
              axisLine={false}
              tickLine={false}
              width={200}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
              }}
              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="likes" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  