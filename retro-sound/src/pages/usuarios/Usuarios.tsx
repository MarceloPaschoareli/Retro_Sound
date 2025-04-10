import style from "./Usuarios.module.css";
import { NavBarVazia } from "../../components/nav-bar-vazia/nav-bar-vazia";
import { ProdutoAdmin } from "../../components/produto-adm/produtoAdmin";
import { useEffect, useState } from "react";
import { myService } from "../../service/ProductsService";
import { AdicionarProduto } from "../../components/adicionar-produto/adicionar";
import { UsuarioCard } from "../../components/usuarios/usuario";
import { UserService } from "../../service/UserService";

interface UserType {
    id: number;
    name: string;
    email:string;
}

function Usuario() {
    const [itens, setItens] = useState<UserType[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchItens = async () => {
            try {
                const response = await UserService.getUsers();
                setItens(response);
            } catch (error) {
                console.error("Erro ao buscar os usuários:", error);
            }
        };

        fetchItens();
    }, []);

    const  Voltar = () =>{
        window.history.back()
    }

    return (
        <div>
            <NavBarVazia />
            <div className={style.content}>
                <h1>Bem-vindo Administrador!</h1>
                <button onClick={Voltar}>Voltar</button>
                <div className={style.products}>
                    {itens.map((item) => (
                        <UsuarioCard
                            key={item.id}
                            id={item.id}
                            nome={item.name}
                            email={item.email}
                            admin={item.email==="marcelo.paschoareli@gmail.com"||item.email==="manuelli.flaviano@example.com"}
                        />
                        
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Usuario;