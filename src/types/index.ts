export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  industry: string;
  revenue: number;
  employees: number;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastContact: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}