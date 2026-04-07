import { useNavigate } from "react-router-dom";
import CardTema from "../cardtema/CardTema"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import type Tema from "../../../models/Tema";


function ListaTemas() {
    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //estado para receber todos os temas do backend
    const [temas, setTemas] = useState<Tema[]>([]); //array pq pode ser mais de um

    //acesso a context para pegar o token - AuthContext
    const { usuario, handleLogout } = useContext(AuthContext)

    //obj para armazenar o token:
    const token = usuario.token

    //useEffect para monitorar o token
    //se ele for vazio, significa que o usuario nao esta logado, entao redireciona para a pagina de login
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado para acessar os temas!')
            navigate('/login')
        }
    }, [token])

    //useEffect para inicializar a funcao de buscar temas assim que o componente for carregado
    useEffect(() => {
        buscarTemas()
    }, [temas.length]) //toda vez q o tamanho da array de temas mudar, ele vai buscar os temas novamente, isso é importante para atualizar a lista de temas quando um tema for deletado ou editado

    //funcao para buscar todos os temas do backend
    async function buscarTemas() {
        try {
            setIsLoading(true) // Inicia o loader

            await buscar('/temas', setTemas, {
                headers: { 'Authorization': token } //token é um obj, por isso fica na entre chaves
            })

        } catch (error: any) {
            if (error.toString().includes('401')) { //se o erro for 401, significa que o token é invalido ou expirou
                handleLogout();
            }
        } finally {
            setIsLoading(false); // Finaliza o loader
        }
    }

    return (
        <>
            { isLoading && (
                    <div className="flex justify-center w-full my-8">
                        <SyncLoader
                            color="#312e81"
                            size={32}
                        />
                    </div>
                )
            }

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    {
                        (!isLoading && temas.length === 0) && (
                            <span className="text-3xl text-center my-8">
                                Nenhum Tema foi encontrado!
                            </span>
                        )
                    }

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                        {temas.map( (tema) => (
                            <CardTema key={tema.id} tema={tema} />
                        ))} 
                        {/* propriedade key é equivalente a uma chave primaria, ja que tema tem id uso ele */}
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default ListaTemas;