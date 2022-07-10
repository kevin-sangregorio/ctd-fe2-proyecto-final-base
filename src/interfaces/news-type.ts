export interface INoticia {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: Date;
    esPremium: boolean;
    imagen: string;
  }

export interface INoticiaNormalizada {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: number | string;
    esPremium: boolean;
    imagen: string;
    descripcionCorta?: string;
  }