import { HospitalUser } from '../interfaces/hospitalUser.interface';

export class Hospital {

    constructor(
        public nombre: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public img?: string,
        public usuario?: HospitalUser,
    ) {}
}
