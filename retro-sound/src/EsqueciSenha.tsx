import { useEffect, useState } from "react"
import style from "./Esqueci.module.css"
import { NavBarVazia } from "./components/nav-bar-vazia/nav-bar-vazia"
import emailImg from "./assets/email.svg"
import senhaImg from "./assets/senha.svg"
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
        const login = await UserService.getEmail(email)
        const user = await UserService.getUser(email);
        if (login){
            UserService.atualizarSenha(user.id,senhaConfirmar)
            setInfoLogado("")
            navigate("/login")
            return
        } else{
            setInfoLogado("E-mail ou senha invalidos!")
            return
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
                        <h1>ALTERAR A SENHA</h1>
                        <div id={style.infos}>
                            <div id={style.email}>
                            <img src={emailImg} />
                            <input type="text" placeholder="E-MAIL" onChange={ (e) => setEmail(e.target.value)} />
                            </div>
                             <div id={style.email}>
                            <img src={senhaImg} />
                            <input type="password" placeholder="SENHA NOVA" id="senha" onChange={ (e) => setSenha(e.target.value)}/>
                        </div>
                        <div id={style.email}>
                            <img src={senhaImg} />
                            <input type="password" placeholder="CONFIRMAR SENHA" id="senha" onChange={ (e) => setSenhaConfirmar(e.target.value)}/>
                        </div>
                        <div id={style.info}>
                            <p >{infoLogado}</p>
                        </div>
                        <div id={style.botao}>
                                <button type="button" onClick={HandlerClick}>
                                    <img src={cadastrar} />
                                    ALTERAR SENHA</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastrarUser