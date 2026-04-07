
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function FormTema() {

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
        } finally {
            setIsLoading(false); // Finaliza o loader
        }
    }

    //useEffect para monitorar o token
    //se ele for vazio, significa que o usuario nao esta logado, entao redireciona para a pagina de login
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado para acessar os temas!')
            navigate('/login')
        }
    }, [token])

    //useEffect para monitorar o id da rota, se tiver id, chama a funcao de buscar tema por id para preencher o formulario com os dados do tema que serao editados
    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId()
        }
    }, [id])

    // função de atualizaçao do estado tema
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }
    async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        //se tiver id, é para editar, se nao tiver id, é para criar um novo tema
        if (id !== undefined) {
            //atualizar tema
            try {
                await atualizar('/temas', tema, setTema, {
                    headers: { 'Authorization': token }
                })
                alert('Tema atualizado com sucesso!');

            } catch (error: any) {
                if (error.toString().includes('401')) { //se o erro for 401, significa que o token é invalido ou expirou
                    handleLogout();
                } else {
                    alert('Erro ao atualizar o tema!');
                } //ex. erro com + de 400 caracteres, entao nao é necessario deslogar
            }

        } else {
            //cadastrar tema
            try {
                await cadastrar('/temas', tema, setTema, {
                    headers: { 'Authorization': token }
                })
                alert('Tema cadastrado com sucesso!');

            } catch (error: any) {
                if (error.toString().includes('401')) { //se o erro for 401, significa que o token é invalido ou expirou
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar o tema!');
                } //ex. erro com + de 400 caracteres, entao nao é necessario deslogar
            }
            setIsLoading(false);
            retornar();
        }

        function retornar() {
            navigate('/temas')
        }

        //remover dps dos testes!!!!!!!
        console.log(JSON.stringify(tema))

        return (
            <div className="container flex flex-col items-center justify-center mx-auto">
                <h1 className="text-4xl text-center my-8">
                    {id === undefined ? 'Cadastrar Tema' : 'Atualizar Tema'}
                </h1>

                <form className="w-1/2 flex flex-col gap-4"
                    onSubmit={gerarNovoTema} //chama a função de cadastro quando o formulário for submetido
                >

                    <div className="flex flex-col gap-2">

                        <label htmlFor="descricao">Descrição do Tema</label>
                        <input
                            type="text"
                            placeholder="Descreva aqui seu tema"
                            name='descricao'
                            className="border-2 border-slate-700 rounded p-2"
                            value={tema.descricao} //o value do input tem que ser igual ao estado, para que o input seja controlado pelo estado
                            onChange={(e) => atualizarEstado(e)} //chama a função de atualização do estado toda vez que o usuário digitar algo no input
                        />
                    </div>

                    <button
                        className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                        type="submit">
                        {
                            isLoading ?

                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                />
                            :
                                <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>

                        }
                    </button>
                </form>
            </div>
        )
    }
}
export default FormTema