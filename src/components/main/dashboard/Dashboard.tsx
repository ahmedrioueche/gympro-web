import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Cards';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { dict } from '../../../lib/dict';
import { useLanguage } from '../../../context/LanguageContext';

const GymDashboard = () => {
  const selectedLanguage = useLanguage();

  // Sample data for the charts
  const membershipData = [
    { month: 'Jan', active: 120, cancelled: 20, new: 35 },
    { month: 'Feb', active: 135, cancelled: 18, new: 40 },
    { month: 'Mar', active: 150, cancelled: 15, new: 45 },
    { month: 'Apr', active: 165, cancelled: 22, new: 38 },
    { month: 'May', active: 180, cancelled: 19, new: 42 },
    { month: 'Jun', active: 195, cancelled: 17, new: 50 }
  ];

  const revenueData = [
    { month: 'Jan', monthly: 4500, yearly: 8500, total: 13000 },
    { month: 'Feb', monthly: 5000, yearly: 9000, total: 14000 },
    { month: 'Mar', monthly: 5500, yearly: 9500, total: 15000 },
    { month: 'Apr', monthly: 6000, yearly: 10000, total: 16000 },
    { month: 'May', monthly: 6500, yearly: 10500, total: 17000 },
    { month: 'Jun', monthly: 7000, yearly: 11000, total: 18000 }
  ];

  const subscriptionDistribution = [
    { name: 'Monthly', value: 60 },
    { name: 'Yearly', value: 40 }
  ];

  const activityData = [
    { time: '6am', count: 20 },
    { time: '9am', count: 45 },
    { time: '12pm', count: 30 },
    { time: '3pm', count: 25 },
    { time: '6pm', count: 50 },
    { time: '9pm', count: 35 }
  ];

  const statsCards = [
    { title: dict[selectedLanguage].totalMembers, value: '584', icon: Users, trend: dict[selectedLanguage].trendPositive + '12%' },
    { title: dict[selectedLanguage].monthlyRevenue, value: '$18,420', icon: DollarSign, trend: dict[selectedLanguage].trendPositive + '8%' },
    { title: dict[selectedLanguage].activePlans, value: '432', icon: Activity, trend: dict[selectedLanguage].trendPositive + '5%' },
    { title: dict[selectedLanguage].growthRate, value: '12%', icon: TrendingUp, trend: dict[selectedLanguage].trendPositive + '2%' }
  ];

  return (
    <div className="flex flex-col h-screen p-2 py-4 md:p-6 bg-light-background dark:bg-dark-background scrollbar-hide overflow-y-auto">
        
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="bg-light-surface dark:bg-dark-surface">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                    {stat.value}
                  </h3>
                  <span className="text-green-500 text-sm">{stat.trend}</span>
                </div>
                <stat.icon className="w-8 h-8 text-light-primary dark:text-dark-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Membership Trends */}
        <Card className="bg-light-surface dark:bg-dark-surface">
          <CardHeader>
            <CardTitle className="text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].membershipTrends}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={membershipData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="active" stroke="#3B82F6" />
                <Line type="monotone" dataKey="new" stroke="#10B981" />
                <Line type="monotone" dataKey="cancelled" stroke="#EF4444" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Analysis */}
        <Card className="bg-light-surface dark:bg-dark-surface">
          <CardHeader>
            <CardTitle className="text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].revenueAnalysis}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="monthly" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                <Area type="monotone" dataKey="yearly" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Activity */}
        <Card className="bg-light-surface dark:bg-dark-surface">
          <CardHeader>
            <CardTitle className="text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].dailyActivity}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription Distribution */}
        <Card className="bg-light-surface dark:bg-dark-surface">
          <CardHeader>
            <CardTitle className="text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].subscriptionTypes}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#3B82F6"
                  dataKey="value"
                  label
                >
                  {subscriptionDistribution.map((entry, index) => (
                    <Cell key={index} fill={index === 0 ? '#3B82F6' : '#8B5CF6'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GymDashboard;
