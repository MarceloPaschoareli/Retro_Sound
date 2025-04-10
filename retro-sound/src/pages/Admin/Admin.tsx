import style from "./Admin.module.css";
import { NavBarVazia } from "../../components/nav-bar-vazia/nav-bar-vazia";
import { ProdutoAdmin } from "../../components/produto-adm/produtoAdmin";
import { useEffect, useState } from "react";
import { myService } from "../../service/ProductsService";
import { AdicionarProduto } from "../../components/adicionar-produto/adicionar";
import { useNavigate } from "react-router-dom";

interface ProdutoType {
    id: number;
    category: {
        name: string;
    };
    url_photo: string;
    price: number;
    name: string;
    description:string;
    stock:number;
}

function Admin() {
    const [itens, setItens] = useState<ProdutoType[]>([]);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchItens = async () => {
            try {
                const response = await myService.getAll();
                setItens(response);
            } catch (error) {
                console.error("Erro ao buscar os itens:", error);
            }
        };

        fetchItens();
    }, []);

    const usuarios = () =>{
        navigate("/admin/usuarios")
    }

    return (
        <div>
            <NavBarVazia />
            <div className={style.content}>
                <h1>Bem-vindo Administrador!</h1>
                <button onClick={usuarios}>USUÁRIOS</button>

                <button onClick={() => setOpen(true)}>CADASTRAR PRODUTOS</button>
                <div className={style.products}>
                    {itens.map((item) => (
                        <ProdutoAdmin
                            key={item.id}
                            id={item.id}
                            categoria={item.category.name}
                            imagem={item.url_photo}
                            preco={item.price}
                            nome={item.name}
                            descricao={item.description}
                            stock={item.stock}
                        />
                    ))}
                </div>
            </div>
            {open && <AdicionarProduto open={open} onClose={() => setOpen(false)} />}
        </div>
    );
}

export default Admin;