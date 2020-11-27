import { MedicolUser } from '../interfaces/medicoUser.interface';
import { Hospital } from './hospital.models';



export class Medico {

    constructor(
        public nombre: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public img?: string,
        public usuario?: MedicolUser,
        public hospital?: Hospital
    ) {}
}
