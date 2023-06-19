import { Address } from './addresses.model';

export class Person {
    id: number;
    name: string;
    birthdate: string;
    addresses: Address[];
}