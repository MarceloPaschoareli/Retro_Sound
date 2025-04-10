import { useEffect, useState } from "react";
import style from "./produto.module.css";
import perfil from "../../assets/login.svg"


interface tipos {
    id: number;
    nome: string;
    email: string;
    admin:boolean;
}

function UsuarioCard({ id, email, nome, admin}: tipos) {
    const [open2, setOpen2] = useState(false);
    const [open, setOpen] = useState(false);


    return (
        <div className={style.tudo}>
            <div className={style.imagem}>
                <img src={perfil} />
            </div>
            <div className={style.info}>
                <h3>{nome}</h3>
                <div id="cod" className={style.cod}>
                    <p>E-mail: {email}</p>
                    <p>Id: {id}</p>
                    <p>Administrador: {String(admin)}</p>
                </div>
            </div>
         </div>
    );
}

export { UsuarioCard };
