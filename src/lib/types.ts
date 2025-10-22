// Types baseados nas entities do backend Spring Boot

export interface Address {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Client {
  id: string;
  name: string;
  cpfCnpj: string;
  email: string;
  phone: string;
  birthDate?: string;
  lastEvent?: string;
  indicated: boolean;
  address?: Address;
}

export interface Combo {
  id: string;
  name: string;
  type: string;
  description?: string;
}

export interface Contract {
  id: string;
  contractNumber: string;
  client: Client;
  numberTotalOfGuests: number;
  numberOfGuestsAdults: number;
  numberOfGuestsTeenagers: number;
  numberOfGuestsChildren: number;
  numberOfGuestsBabies: number;
  finalPrice: number;
  eventDate: string; // ISO string
  contractingPizza?: string;
  ovenType: string;
  statusPayment: 'PENDING' | 'PARTIAL' | 'PAID';
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  methodPayment: string;
  discountType?: string;
  discountValue: number;
  freightValue: number;
  agreed: boolean;
  eventType?: string;
  voucherId?: string;
  combos: Combo[];
  address: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Voucher {
  id: string;
  code: string;
  discountPercentage: number;
  isActive: boolean;
  isUsed: boolean;
  franchiseId: string;
  contractId?: string;
  clientCpfCnpj: string;
  createdAt: string;
  expiresAt: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PointsSummary {
  totalPoints: number;
  totalEvents: number;
  completedContracts: Contract[];
}

export interface VoucherGenerateRequest {
  clientCpfCnpj: string;
  pointsToUse: number;
  franchiseId: string;
}
