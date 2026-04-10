import { useContext, type ReactNode } from "react"
import { AuthContext } from "../../contexts/AuthContext"

function Footer() {

    let data = new Date().getFullYear()

    //variavel para renderizar o footer somente quando o usuario estiver logado, ou seja, quando o token for diferente de vazio
    const { usuario } = useContext(AuthContext)
    let component: ReactNode
    if (usuario.token !== '') {
        component = (
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xs font-light'>
                        Blog Pessoal | Copyright: {data}
                    </p>
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

export default Footer