export interface User {
  id?: string;
  email: string | null;
  name: string | null;
  isLoggedIn?: boolean;
  isEmailValidated?: boolean;
  logo?: string;
}

export interface Member {
  id?: string;
  name: string;
  age?: string;
  gender: string;
  email?: string;
  phone?: string;
  joinDate: Date;
  image?: File | undefined | null;
  imagePath?: string;
  icon?: string;
  subscriptionType: string;
  isSubscriptionActive: boolean;
  lastSubscriptionDate: Date;
  lastPaymentValue?: number;
}