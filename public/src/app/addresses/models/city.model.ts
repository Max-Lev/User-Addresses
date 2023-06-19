export class City {
    id: number;
    name: string;
    countryId: number;
    constructor(city:City) {
        Object.assign(this,city);
    }
}