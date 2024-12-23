import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Cards';
import { Users, Clock, DollarSign, UserPlus, Activity } from 'lucide-react';
import { Member } from '../../utils/types';
import MemberCardHori from './members/MemberCardHori';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dict } from '../../utils/dict';
import { useLanguage } from '../../context/LanguageContext';

const Home = () => {
  const selectedLanguage = useLanguage();
  const quickStats = [
    { id: 1, title: dict[selectedLanguage].activeMembers, value: '432', icon: Users },
    { id: 2, title: dict[selectedLanguage].newMembersToday, value: '12', icon: UserPlus },
    { id: 3, title: dict[selectedLanguage].revenueToday, value: '$2,320', icon: DollarSign },
    { id: 4, title: dict[selectedLanguage].checkIns, value: '145', icon: Clock },
  ];

  const newMembers: Member[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      age: '29',
      gender: 'Male',
      email: 'alex.johnson@example.com',
      phone: '555-1234',
      joinDate: new Date(),
      image: null,
      icon: `/male.png`,
      subscriptionType: 'Premium',
      isSubscriptionActive: true,
      lastSubscriptionDate: new Date(),
      lastPaymentValue: 30,
    },
    {
      id: '2',
      name: 'Maria Lopez',
      age: '34',
      gender: 'Female',
      email: 'maria.lopez@example.com',
      phone: '555-5678',
      joinDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      image: null,
      icon: `/female.png`,
      subscriptionType: 'Basic',
      isSubscriptionActive: true,
      lastSubscriptionDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      lastPaymentValue: 120,
    },
    {
      id: '3',
      name: 'Alex Johnson',
      age: '29',
      gender: 'Male',
      email: 'alex.johnson@example.com',
      phone: '555-1234',
      joinDate: new Date(),
      image: null,
      icon: `/male.png`,
      subscriptionType: 'Premium',
      isSubscriptionActive: true,
      lastSubscriptionDate: new Date(),
      lastPaymentValue: 30,
    },
    {
      id: '4',
      name: 'Maria Lopez',
      age: '34',
      gender: 'Female',
      email: 'maria.lopez@example.com',
      phone: '555-5678',
      joinDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      image: null,
      icon: `/female.png`,
      subscriptionType: 'Basic',
      isSubscriptionActive: true,
      lastSubscriptionDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      lastPaymentValue: 120,
    },
    {
      id: '5',
      name: 'Alex Johnson',
      age: '29',
      gender: 'Male',
      email: 'alex.johnson@example.com',
      phone: '555-1234',
      joinDate: new Date(),
      image: null,
      icon: `/male.png`,
      subscriptionType: 'Premium',
      isSubscriptionActive: true,
      lastSubscriptionDate: new Date(),
      lastPaymentValue: 30,
    },
    {
      id: '6',
      name: 'Maria Lopez',
      age: '34',
      gender: 'Female',
      email: 'maria.lopez@example.com',
      phone: '555-5678',
      joinDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      image: null,
      icon: `/female.png`,
      subscriptionType: 'Basic',
      isSubscriptionActive: true,
      lastSubscriptionDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      lastPaymentValue: 120,
    },
  ];

  // Live data for the chart
  const liveData = [
    { time: '9:00', checkIns: 12, revenue: 240 },
    { time: '10:00', checkIns: 18, revenue: 360 },
    { time: '11:00', checkIns: 25, revenue: 500 },
    { time: '12:00', checkIns: 30, revenue: 600 },
    { time: '13:00', checkIns: 28, revenue: 560 },
    { time: '14:00', checkIns: 22, revenue: 440 },
    { time: '15:00', checkIns: 32, revenue: 640 },
  ];

  return (
    <div className="flex h-screen flex-col space-y-6 overflow-y-auto bg-light-background p-4 text-light-text-primary scrollbar-hide dark:bg-dark-background dark:text-dark-text-primary md:p-6">
      {/* Quick Stats Section */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {quickStats.map(stat => (
          <Card key={stat.id} className="bg-light-surface dark:bg-dark-surface">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{stat.title}</p>
                <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">{stat.value}</h3>
              </div>
              <stat.icon className="h-8 w-8 text-light-primary dark:text-dark-primary" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Data Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Live Chart */}
        <Card className="bg-light-surface dark:bg-dark-surface">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />

              {dict[selectedLanguage].liveActivity}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={liveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="checkIns"
                    stroke="#2563eb"
                    strokeWidth={2}
                    name="Check-ins"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#16a34a"
                    strokeWidth={2}
                    name="Revenue ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        {/* New Members Section */}
        <Card className="bg-light-surface dark:bg-dark-surface">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              {dict[selectedLanguage].newMembers}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {newMembers.map(member => (
              <MemberCardHori key={member.id} member={member} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
