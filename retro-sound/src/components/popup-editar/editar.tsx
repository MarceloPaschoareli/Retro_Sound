import { useEffect, useState } from "react";
import style from "./editar.module.css";
import { myService } from "../../service/ProductsService";

interface Tipo {
    open: boolean;
    onClose: () => void;
    nome1: string;
    preco1: number;
    descricao1: string;
    categoria1: string;
    imagem1: any;
    stock1: number;
    id1:number;
}

interface Categoria {
    id: number;
    name: string;
}

const getCategorias = async (): Promise<Categoria[]> => {
    try {
        const response = await fetch(`http://localhost:3000/categories`);
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        return [];
    }
};

function EditarProduto({ open, onClose, nome1, preco1, descricao1, categoria1, imagem1, stock1, id1 }: Tipo) {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(0.0);
    const [descricao, setDesc] = useState("");
    const [categoria, setCategoria] = useState<number | null>(null);
    const [imagem, setImagem] = useState("");
    const [stock, setStock] = useState(0);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        const tela = document.getElementById("pop");
        if (tela) {
            tela.style.display = open ? "flex" : "none";
        }

        if (open) {
            setNome(nome1);
            setPreco(preco1);
            setDesc(descricao1);
            setImagem(imagem1);
            setStock(stock1);
        }
    }, [open]);

    useEffect(() => {
        const fetchCategorias = async () => {
            const data = await getCategorias();
            setCategorias(data);
            const categoriaEncontrada = data.find(cat => cat.name === categoria1);
            setCategoria(categoriaEncontrada ? categoriaEncontrada.id : null);
        };
        fetchCategorias();
    }, [categoria1]);

    const cadastrar = async () => {
        if (!categoria) {
            alert("Selecione uma categoria!");
            return;
        }
        await myService.atualizarProduto(nome, descricao, preco, imagem, categoria, stock, id1);
        window.location.reload();
    };

    return (
        <div className={style.content} id="pop" onClick={onClose}>
            <div className={style.quadro} onClick={(e) => e.stopPropagation()}>
                <h1>Editar Produto</h1>
                <div id={style.infos}>
                    <div id={style.email}>
                        <input type="text" placeholder="NOME" onChange={(e) => setNome(e.target.value)} value={nome} />
                    </div>
                    <div id={style.email}>
                        <input type="number" min={0} placeholder="PREÇO" onChange={(e) => setPreco(Number(e.target.value))} value={preco} />
                    </div>
                    <div id={style.email}>
                        <input type="text" placeholder="DESCRIÇÃO" onChange={(e) => setDesc(e.target.value)} value={descricao} />
                    </div>
                    <div className={style.selectContainer}>
                        <select onChange={(e) => setCategoria(Number(e.target.value))} value={categoria || ""}>
                            <option value="">Selecione uma categoria</option>
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div id={style.email}>
                        <input type="text" placeholder="URL IMAGEM" onChange={(e) => setImagem(e.target.value)} value={imagem} />
                    </div>
                    <div id={style.email}>
                        <input type="number" min={0} placeholder="ESTOQUE" onChange={(e) => setStock(Number(e.target.value))} value={stock} />
                    </div>
                    <button onClick={cadastrar}>EDITAR PRODUTO</button>
                </div>
            </div>
        </div>
    );
}

export { EditarProduto };
