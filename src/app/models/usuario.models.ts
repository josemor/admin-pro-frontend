import { environment } from 'src/environments/environment';



const BASE_URL = environment.base_url;


export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string) { }

    // tslint:disable-next-line: typedef
    get imagenUrl() {

        if (!this.img) {
            return `${BASE_URL}/upload/usuarios/no-user`;

        } else if (this.img.includes('https')) {
            return this.img;

        } else if (this.img) {
            return `${BASE_URL}/upload/usuarios/${this.img}`;

        } else {
            return `${BASE_URL}/upload/usuarios/no-user`;
        }
    }
}

