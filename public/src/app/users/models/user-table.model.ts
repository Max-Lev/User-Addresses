export const USER_MODEL_COLUMNS = ['id', 'name', 'birthdate', 'addresses'];

export interface IDisplayedColumns {
    key: string;
    header: string;
};
export const DISPLAYED_COLUMNS: IDisplayedColumns[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'birthdate', header: 'Birthdate' },
    { key: 'addresses', header: 'Addresses count.' }
];