import { useEffect } from "react"
import { cookies } from "./hooks/cookie"
import { useNavigate } from "react-router-dom"
import { NavBarVazia } from "./components/nav-bar-vazia/nav-bar-vazia"
import { useState } from "react"
import style from "./Login.module.css"
import emailImg from "./assets/email.svg"
import senhaImg from "./assets/senha.svg"
import entrar from "./assets/entrar.svg"
import { UserService } from "./service/UserService"
import { CarrinhoService } from "./service/CarrinhoService"

function Login(){
    const[email, setEmail] = useState("");
    const[infoLogado, setInfoLogado] = useState("")
    const[senha, setSenha] = useState("");

    const Cadastrar = () =>{
        navigate('/cadastrar')
    }

    const Esqueci = () =>{
        navigate("/Esqueci")
    }


    const HandlerClick = async () =>{
        const logado = await UserService.fazerLogin(email, senha)
        const user = await UserService.getUser(email)   

        if(email==="marcelo.paschoareli@gmail.com"){
            navigate("/")
        }

        if (logado){
            cookies.fazerLogin(email,user.id)
            navigate("/")
        } else{
            setInfoLogado("E-mail ou senha inválidos!")
        }   
    }

    const navigate = useNavigate()

    useEffect  (() =>{
        if (cookies.verificarLogin()){
            navigate("/")
        }
    }, [])
    return (
        <div className={style.tudo}>
            <NavBarVazia></NavBarVazia>
            <div className={style.conteudo}>
                <div className={style.conteudoC}>
                    <div id={style.login}>
                        <h1>ACESSAR CONTA</h1>
                        <div id={style.infos}>
                            <div id={style.email}>
                            <img src={emailImg} />
                            <input type="text" placeholder="E-MAIL" onChange={ (e) => setEmail(e.target.value)} />
                            </div>
                             <div id={style.email}>
                            <img src={senhaImg} />
                            <input type="password" placeholder="SENHA" id="senha" onChange={ (e) => setSenha(e.target.value)}/>
                        </div>
                        <div id={style.info}>
                            <p >{infoLogado}</p>
                        </div>
                        <div id={style.botao}>
                                <button type="button" onClick={HandlerClick}>
                                    <img src={entrar} />
                                    ENTRAR</button>
                            </div>
                        </div>
                    </div>
                    <div id={style.outros}>
                        <div >
                            <p>Novo no Retro Sound?</p>
                            <a onClick={Cadastrar}>Cadastre-se</a>
                        </div>
                        <div>
                            <a onClick={Esqueci}>Esqueci a senha</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login