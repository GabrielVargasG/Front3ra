import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import mathApi from '../api/mathApi';
import { Niveles, NivelesResponse } from '../interfaces/appInterfaces';

type NivelContextProps = {
    // n:string|undefined;
    limpiar:()=> void;
    // cambiarNA:(id: string) => void;
    niveles: Niveles[];
    niveles2: Niveles[];
    nivelesT: Niveles[];
    loadNiveles: () => Promise<void>;
    addNivel: ( categoryId: string, productName: string ) => Promise<Niveles>;
    updateNivel: ( valor: number, productId: string ) => Promise<void>;
    // deleteProduct: ( id: string ) => Promise<void>;
    // loadProductById: ( id: string ) => Promise<Niveles>;
}

export const NivelContext = createContext({} as NivelContextProps);

export const NivelesProvider = ({ children }: any ) => {
    
    // const [n, setN] = useState<string>();
    const [niveles, setNiveles] = useState<Niveles[]>([]);
    const [niveles2, setNiveles2] = useState<Niveles[]>([]);
    const [nivelesT, setNivelesT] = useState<Niveles[]>([]);

    const limpiar = () =>{
        setNiveles([]);
        setNiveles2([]);
    }


    const loadNiveles = async() => {
        const resp = await mathApi.get<NivelesResponse>('/productos');
        setNivelesT([ ...resp.data.niveles ]);
              setNiveles([ ...resp.data.niveles ].filter((item) => item.grado.match("1")).sort((a, b) => {
      const nivelA = parseInt(a.nombre.split(" ")[1]); // Extraer el número del nombre del nivel
      const nivelB = parseInt(b.nombre.split(" ")[1]);
      return nivelA - nivelB; // Ordenar de forma ascendente por el número del nivel
    }));
              setNiveles2([ ...resp.data.niveles ].filter((item) => item.grado.match("2")).sort((a, b) => {
                const nivelA = parseInt(a.nombre.split(" ")[1]); // Extraer el número del nombre del nivel
                const nivelB = parseInt(b.nombre.split(" ")[1]);
                return nivelA - nivelB; // Ordenar de forma ascendente por el número del nivel
              }));

    }

    const addNivel = async( categoryId: string, NivelName: string ): Promise<Niveles> => {
        
        const resp = await mathApi.post<Niveles>('/productos', {
            nombre: NivelName,
            categoria: categoryId
        });
        setNiveles([ ...niveles, resp.data ]);
        
        return resp.data;
    }

    const updateNivel = async( valor: number, nivelId: string) =>{
        const resp = await mathApi.put<Niveles>(`/productos/${ nivelId }`, {
            valor: valor,
            completo:"true"
        });
        setNiveles( niveles.map( prod => {
            return (prod._id === nivelId )
                    ? resp.data
                    : prod;
        }) );
    }
    return(
        <NivelContext.Provider value={{
            limpiar,
            niveles,
            // n,
            // cambiarNA,
            niveles2,
            nivelesT,
            loadNiveles,
            addNivel,
            updateNivel,
            // deleteProduct,
            // loadProductById,
        }}>
            { children }
        </NivelContext.Provider>
    )
}
