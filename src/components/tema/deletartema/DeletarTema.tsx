import { useContext, useEffect, useState } from "react";
import { buscar, deletar } from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //estado para receber os dados do tema que serao digitados no formulario
    const [tema, setTema] = useState<Tema>({} as Tema); //obj

    //acesso a context para pegar o token - AuthContext
    const { usuario, handleLogout } = useContext(AuthContext)

    //obj para armazenar o token:
    const token = usuario.token;

    //acessar o  parametro id da url, para saber se o formulario é para criar um novo tema ou editar um tema existente
    //se tiver id, é para editar, se nao tiver id, é para criar um novo tema
    const { id } = useParams<{ id: string }>();

    //buscar tema por id, para preencher o formulario com os dados do tema que serao editados
    async function buscarTemaPorId() {
        try {
            setIsLoading(true) // Inicia o loader

            await buscar(`/temas/${id}`, setTema, {
                headers: { 'Authorization': token } //token é um obj, por isso fica na entre chaves
            })

        } catch (error: any) {
            if (error.toString().includes('401')) { //se o erro for 401, significa que o token é invalido ou expirou
                handleLogout();
            }
        }
        setIsLoading(false); // Finaliza o loader 
    }

    //useEffect para monitorar o token
    //se ele for vazio, significa que o usuario nao esta logado, entao redireciona para a pagina de login
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado para acessar os temas!', 'aviso')
            navigate('/login')
        }
    }, [token])

    //useEffect para monitorar o id da rota, se tiver id, chama a funcao de buscar tema por id para preencher o formulario com os dados do tema que serao editados
    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId()
        }
    }, [id])

    function retornar() {
        navigate('/temas')
    }

    async function deletarTema() {
        setIsLoading(true) // Inicia o loader
        try {
            await deletar(`/temas/${id}`, {
                headers: { 'Authorization': token } //token é um obj, por isso fica na entre chaves
            })
            ToastAlerta('Tema deletado com sucesso!', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) { //se o erro for 401, significa que o token é invalido ou expirou
                handleLogout();
            }
        }
        setIsLoading(false); // Finaliza o loader
        retornar();
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar tema</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o tema a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Tema
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
                <div className="flex">
                    <button
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                        onClick={deletarTema}
                    >
                        {
                            isLoading ?
                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                />
                                :
                                <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarTema