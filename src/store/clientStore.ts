import { create } from 'zustand';
import type { Client } from '../types';

interface ClientStore {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [
    {
      id: '1',
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corp',
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: '350 5th Ave, New York, NY 10118',
      },
      industry: 'Technology',
      revenue: 1000000,
      employees: 50,
      status: 'active',
      createdAt: '2024-01-15',
      lastContact: '2024-03-01',
    },
    // Add more sample clients here
  ],
  addClient: (client) =>
    set((state) => ({ clients: [...state.clients, client] })),
  updateClient: (id, updatedClient) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id ? { ...client, ...updatedClient } : client
      ),
    })),
  deleteClient: (id) =>
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
    })),
}));