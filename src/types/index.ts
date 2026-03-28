export interface User {
  id: string;
  email: string;
  full_name?: string;
  location?: string;
  skills?: string[];
  interests?: string[];
  avatar_url?: string;
}

export interface Opportunity {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  contact: string;
  user_id: string;
}

export interface Resource {
  id: number;
  user_id: string;
  type: 'offer' | 'request';
  resource_name: string;
  quantity: number;
  location: string;
  description: string;
}

export interface VolunteerSignup {
  id: number;
  user_id: string;
  opportunity_id: number;
  status: string;
  opportunity?: Opportunity;
}

export interface CommunityTip {
  id: number;
  text: string;
  category: string;
}

export type AuthFormMode = 'login' | 'signup';