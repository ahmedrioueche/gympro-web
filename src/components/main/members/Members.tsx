import { Member } from '../../../utils/types';
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import MemberCard from './MemberCard';
import CustomDropdown from '../../ui/SelectDropDown';
import EditMemberModal from '../modals/EditMemberModal';
import DeleteMemberModal from '../modals/DeleteMemberModal';
import gym_2 from '../../../assets/images/gym_2.svg';
import { dict } from '../../../utils/dict';
import { useLanguage } from '../../../context/LanguageContext';

const initialMembers: Member[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    age: '25',
    gender: 'female',
    email: 'alice.j@example.com',
    phone: '123-456-7890',
    icon: `/female.png`,
    joinDate: new Date('2023-01-01'),
    subscriptionType: 'premium',
    isSubscriptionActive: true,
    lastSubscriptionDate: new Date('2023-12-31'),
    lastPaymentValue: 100,
  },
  {
    id: '2',
    name: 'Bob Smith',
    age: '30',
    gender: 'male',
    email: 'bob.s@example.com',
    phone: '098-765-4321',
    icon: `/male.png`,
    joinDate: new Date('2023-05-10'),
    subscriptionType: 'basic',
    isSubscriptionActive: false,
    lastSubscriptionDate: new Date('2023-06-10'),
    lastPaymentValue: 50,
  },
  {
    id: '3',
    name: 'Ahmed Drioueche',
    age: '23',
    gender: 'male',
    email: 'adsrahmed@gmail.com',
    phone: '0556452962',
    icon: `/male.png`,
    joinDate: new Date('2023-01-01'),
    subscriptionType: 'premium',
    isSubscriptionActive: true,
    lastSubscriptionDate: new Date('2023-12-31'),
    lastPaymentValue: 100,
  },
];

const Members: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<Member>();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [memberToDeleteId, setMemberToDeleteId] = useState<number | string>();
  const selectedLanguage = useLanguage();
  const filteredMembers = useMemo(() => {
    return initialMembers
      .filter(member => {
        const matchesSearch =
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (member.email && member.email.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus =
          statusFilter === 'all' ||
          (statusFilter === 'active' && member.isSubscriptionActive) ||
          (statusFilter === 'inactive' && !member.isSubscriptionActive);
        const matchesMembership = membershipFilter === 'all' || member.subscriptionType === membershipFilter;

        return matchesSearch && matchesStatus && matchesMembership;
      })
      .sort((a, b) => {
        return sortBy === 'name'
          ? a.name.localeCompare(b.name)
          : new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      });
  }, [searchQuery, statusFilter, membershipFilter, sortBy]);

  const handleEdit = (member: Member) => {
    setMemberToEdit(member);
    setIsEditOpen(true);
  };

  const handleDelete = (id: string) => {
    setMemberToDeleteId(id);
    setIsDeleteOpen(true);
  };

  return (
    <div className="w-full h-full z-0 p-4 px-7 bg-light-background dark:bg-dark-background relative">
      {/* Background Image in Top Right Corner */}
      <div className="absolute md:-top-14 md:-right-20 right-24 -top-48 md:w-2/4 md:h-2/4 w-3/4 h-3/4 opacity-30  pointer-events-none">
        <img src={gym_2} alt="Gym" className="w-full h-full object-contain" />
      </div>

      <div className="relative z-20 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mt-3 mb-8">
        <div className="flex flex-col lg:items-center lg:justify-center">
          {/* Search Bar */}
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder={dict[selectedLanguage].searchPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-light-surface dark:bg-dark-surface px-4 py-3 pl-10 text-sm border-none focus:ring-1 focus:ring-dark-primary outline-none dark:text-dark-text-primary"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 mt-0.5 text-light-text-secondary dark:text-dark-text-secondary" />
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <CustomDropdown
              options={dict[selectedLanguage].statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder={dict[selectedLanguage].selectStatus}
              className="lg:w-44 bg-light-surface dark:bg-dark-surface"
            />
            <CustomDropdown
              options={dict[selectedLanguage].membershipOptions}
              value={membershipFilter}
              onChange={setMembershipFilter}
              placeholder={dict[selectedLanguage].selectMembership}
              className="lg:w-44 bg-light-surface dark:bg-dark-surface"
            />
            <CustomDropdown
              options={dict[selectedLanguage].sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder={dict[selectedLanguage].sortBy}
              className="lg:w-44 bg-light-surface dark:bg-dark-surface"
            />
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="relative z-10 mb-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
        {dict[selectedLanguage].showingMembers.replace('{count}', filteredMembers.length.toString())}
      </div>

      {/* Member Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.length > 0 ? (
          filteredMembers.map(member => (
            <MemberCard key={member.id} member={member} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-light-text-secondary dark:text-dark-text-secondary">
            {dict[selectedLanguage].noMembersFound}
          </div>
        )}
      </div>

      {/* Modals */}
      <EditMemberModal member={memberToEdit} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
      <DeleteMemberModal memberId={memberToDeleteId} isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} />
    </div>
  );
};

export default Members;
