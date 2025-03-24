import { useEffect, useState } from "react"
import style from "./CadastrarUser.module.css"
import { NavBarVazia } from "./components/nav-bar-vazia/nav-bar-vazia"
import emailImg from "./assets/email.svg"
import senhaImg from "./assets/senha.svg"
import infoLogado from "./assets/info.svg"
import cadastrar from "./assets/cadastrar.svg"
import { UserService } from "./service/UserService"
import { cookies } from "./hooks/cookie"
import { useNavigate } from "react-router-dom"
import { CarrinhoService } from "./service/CarrinhoService"


function CadastrarUser (){
    const[filto, setFiltro] = useState("")
    const[nome,setNome] = useState("")
    const[senha, setSenha] = useState("")
    const[senhaConfirmar, setSenhaConfirmar] = useState("")
    const[email, setEmail] = useState("")
    const[infoLogado, setInfoLogado] = useState("")

    const navigate = useNavigate()

    const HandlerClick = async () =>{
        setInfoLogado("");

        const responseEmail = await UserService.verificarEmail(email);
        console.log(responseEmail);

        if (responseEmail !== "") {
            setInfoLogado(responseEmail);
            return;
        } 
        
        if (senha !== senhaConfirmar) {
            console.log("As senhas são diferentes!");
            setInfoLogado("As senhas são diferentes!");
            return;
        }

        try{
            const cadastrar = await UserService.cadastrarUser(nome,email,senha);
            const data = await cadastrar.json()
            const id = data.id
            CarrinhoService.criarCarrinho(id)
            cookies.fazerLogin(email,id)
            navigate("/")
        } catch(erro){
            setInfoLogado("Não foi possível cadastrar o usuário!")
        }
        
    }

    useEffect  (() =>{
        if (cookies.verificarLogin()){
            navigate("/")
        }
    }, [])

    return(
            <div className={style.tudo}>
            <NavBarVazia></NavBarVazia>
            <div className={style.conteudo}>
                <div className={style.conteudoC}>
                    <div id={style.login}>
                        <h1>CRIE SUA CONTA</h1>
                        <div id={style.infos}>
                        <div id={style.email}>
                            <img src={emailImg} />
                            <input type="text" placeholder="NOME DE USUÁRIO" onChange={ (e) => setNome(e.target.value)} />
                            </div>
                            <div id={style.email}>
                            <img src={emailImg} />
                            <input type="text" placeholder="E-MAIL" onChange={ (e) => setEmail(e.target.value)} />
                            </div>
                             <div id={style.email}>
                            <img src={senhaImg} />
                            <input type="password" placeholder="CRIE UMA SENHA" id="senha" onChange={ (e) => setSenha(e.target.value)}/>
                        </div>
                        <div id={style.email}>
                            <img src={senhaImg} />
                            <input type="password" placeholder="CONFIRME A SENHA" id="senha" onChange={ (e) => setSenhaConfirmar(e.target.value)}/>
                        </div>
                        <div id={style.info}>
                            <p >{infoLogado}</p>
                        </div>
                        <div id={style.botao}>
                                <button type="button" onClick={HandlerClick}>
                                    <img src={cadastrar} />
                                    CRIAR CONTA</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastrarUser