import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    //consumo do contexto de autenticação - AuthContext
    //desestruturação para pegar a função de logout do contexto de autenticação, para poder deslogar o usuário quando ele clicar no botão de sair
    const { handleLogout, usuario } = useContext(AuthContext)

    function logout() {
        handleLogout() //zera o estado usuario no contexto
        ToastAlerta("Usuário deslogado com sucesso!", 'sucesso') //ToastAlertaa para o usuário que ele foi deslogado
        navigate("/") //pag de login
    }

    //varialvel para renderizar o navbar somente quando o usuario estiver logado, ou seja, quando o token for diferente de vazio    
    let component: ReactNode
    if (usuario.token !== '') {
        component = (
            <div className='w-full flex justify-center py-4
            			   bg-indigo-900 text-white'>

                <div className="container flex justify-between text-lg mx-8">

                    <Link to="/home" className="text-2xl font-bold">
                        Blog Pessoal
                    </Link>

                    <div className='flex gap-4'>
                        Postagens
                        <Link to='/temas' className='hover:underline'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                        Perfil
                        <Link to="" onClick={logout} className="hover:underline">Sair</Link>  {/* funçao nao é rota, por isso o - to="" - ta vazio */}
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
            {component}
        </>
    )
}

export default Navbar