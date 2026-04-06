

function Cadastro() {
  return (
    <>
      <div className="grid grid-cols-1">

        <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center">
        </div>

        <form>
          <h2>Cadastrar</h2>

          <div>
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome" placeholder="Nome" />
          </div>

          <div>
            <label htmlFor="usuario">Usuario</label>
            <input type="text" id="usuario" name="usuario" placeholder="Usuario" />
          </div>

          <div>
            <label htmlFor="foto">Foto</label>
            <input type="text" id="foto" name="foto" placeholder="Foto" />
          </div>

          <div>
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" name="senha" placeholder="Senha" />
          </div>

          <div>
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input type="password" id="confirmarSenha" name="confirmarSenha" placeholder="Confirmar Senha" />
          </div>

          <div>
            <button type="reset">Cancelar</button>
            <button type="submit">Cadastrar</button>
          </div>

        </form>
      </div>    
    </>
  )
}

export default Cadastro

