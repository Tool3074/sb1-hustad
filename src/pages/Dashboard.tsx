import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useClientStore } from '../store/clientStore';
import {
  Users,
  TrendingUp,
  Building2,
  ArrowUpRight,
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function Dashboard() {
  const clients = useClientStore((state) => state.clients);

  const stats = [
    {
      name: 'Total Clients',
      value: clients.length,
      icon: Users,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Active Clients',
      value: clients.filter((c) => c.status === 'active').length,
      icon: TrendingUp,
      change: '+54.02%',
      changeType: 'positive',
    },
    {
      name: 'Total Revenue',
      value: `$${(
        clients.reduce((acc, client) => acc + client.revenue, 0) / 1000000
      ).toFixed(2)}M`,
      icon: Building2,
      change: '+12.05%',
      changeType: 'positive',
    },
  ];

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const clientDistribution = {
    labels: ['Technology', 'Finance', 'Healthcare', 'Retail'],
    datasets: [
      {
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <stat.icon className="h-5 w-5 text-gray-400" />
                {stat.name}
              </div>
            </dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                {stat.value}
              </div>
              <div
                className={`inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0 ${
                  stat.changeType === 'positive'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                <ArrowUpRight className="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0" />
                {stat.change}
              </div>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Revenue Overview
          </h3>
          <Bar
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
          />
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Client Distribution
          </h3>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={clientDistribution}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}