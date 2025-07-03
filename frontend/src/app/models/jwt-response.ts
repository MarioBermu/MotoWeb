export interface JwtResponseI {
  //creamos un objeto porque es lo que nos devuelve el backend (nuestra api)
  dataUser: {
    id: number;
    name: string;
    email: string;
    accessToken: string;
    expiresIn: string;
  };

  dataMensaje: {
    id: number;
    name: string;
    mensaje: string;
  }
}
