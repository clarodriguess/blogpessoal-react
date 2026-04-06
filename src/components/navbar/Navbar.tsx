import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    //consumo do contexto de autenticação - AuthContext
    //desestruturação para pegar a função de logout do contexto de autenticação, para poder deslogar o usuário quando ele clicar no botão de sair
    const { handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout() //zera o estado usuario no contexto
        alert("Usuário deslogado com sucesso!") //alerta para o usuário que ele foi deslogado
        navigate("/") //pag de login
    }


    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-indigo-900 text-white'>

                <div className="container flex justify-between text-lg mx-8">

                    <Link to="/home" className="text-2xl font-bold">
                        Blog Pessoal
                    </Link>

                    <div className='flex gap-4'>
                        Postagens
                        Temas
                        Cadastrar tema
                        Perfil
                        <Link to="" onClick={logout} className="hover:underline"> 
                            Sair
                        </Link>  {/* funçao nao é rota, por isso o - to="" - ta vazio */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar