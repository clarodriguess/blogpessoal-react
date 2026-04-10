import { createContext, useState, type ReactNode } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"

//
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
} //propriedades do contexto de autenticação

//quem ira consumir o meu provedor:
interface AuthProviderProps {
    children: ReactNode
} //propriedades do provedor de autenticação

//Criacao do contexto de autenticação
//o meu contexto ira disponibilizar os estados e funcoes do tipo AuthCOntextProps
export const AuthContext = createContext({} as AuthContextProps) //cria o contexto de autenticação

//criacao do provedor
//inicializa o estado usuario 
export function AuthProvider({ children }: AuthProviderProps) {
    
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        foto: "",
        senha: "",
        token: ""
    })//estado para armazenar os dados do usuario autenticado
    
    const [isLoading, setIsLoading] = useState<boolean>(false) //estado para controlar o Loader do componente login (animacao de carregamento)

    //funcao para realizar o login do usuario
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true) //ativa o Loader
        try{
            await login('/usuarios/logar', usuarioLogin, setUsuario) //chama a funcao de login do Service e atualiza o estado usuario com os dados do usuario autenticado
            ToastAlerta('Usuário autenticado com sucesso!', 'sucesso')
        }catch(error){
            ToastAlerta('Erro ao realizar login!', 'erro')
        }
        setIsLoading(false) //desativa o Loader
    }

    //funcao para realizar o logout do usuario
    function handleLogout() {       
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        }) //atualiza o estado usuario com os dados do usuario autenticado
    }

    //retorna o provedor de autenticação com os valores do contexto
    return (
        <AuthContext.Provider value={{ usuario, handleLogout, handleLogin, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

       