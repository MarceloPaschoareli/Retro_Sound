import { useEffect, useState } from "react";
import style from "./adicionar.module.css";
import { myService } from "../../service/ProductsService";

interface Tipo {
    open: boolean;
    onClose: () => void;
}

// Tipagem para categoria
interface Categoria {
    id: number;
    name: string;
}

// Função para buscar categorias
const getCategorias = async (): Promise<Categoria[]> => {
    try {
        const response = await fetch(`http://localhost:3000/categories`);
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        return [];
    }
};

function AdicionarProduto({ open, onClose }: Tipo) {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(0.0);
    const [descricao, setDesc] = useState("");
    const [categoria, setCategoria] = useState<number | null>(null);
    const [imagem, setImagem] = useState("");
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        const tela = document.getElementById("pop");
        if (tela) {
            tela.style.display = open ? "flex" : "none";
        }
    }, [open]);

    useEffect(() => {
        const fetchCategorias = async () => {
            const data = await getCategorias();
            setCategorias(data);
        };
        fetchCategorias();
    }, []);

    const cadastrar = async () => {
        if (!categoria) {
            alert("Selecione uma categoria!");
            return;
        }
        await myService.cadastrarProduto(nome, descricao, preco, imagem, categoria);
        window.location.reload()
    };

    return (
        <div className={style.content} id="pop" onClick={onClose}>
            <div className={style.quadro} onClick={(e) => e.stopPropagation()}>
                <h1>Novo Produto</h1>
                <div id={style.infos}>
                    <div id={style.email}>
                        <input type="text" placeholder="NOME" onChange={(e) => setNome(e.target.value)} required/>
                    </div>
                    <div id={style.email}>
                        <input type="number" min={0} placeholder="PREÇO" onChange={(e) => setPreco(Number(e.target.value))} required/>
                    </div>
                    <div id={style.email}>
                        <input type="text" placeholder="DESCRIÇÃO" onChange={(e) => setDesc(e.target.value)} required/>
                    </div>
                    <div className={style.selectContainer}>
                        <select onChange={(e) => setCategoria(Number(e.target.value))} required>
                            <option value="">Selecione uma categoria</option>
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div id={style.email}>
                        <input type="text" placeholder="URL IMAGEM" onChange={(e) => setImagem(e.target.value)} required />
                    </div>
                    <button onClick={cadastrar}>CADASTRAR PRODUTO</button>
                </div>
            </div>
        </div>
    );
}

export { AdicionarProduto };
