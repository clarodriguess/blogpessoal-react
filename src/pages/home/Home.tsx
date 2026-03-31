
function Home() {
    return (
        <section
            style={{
                backgroundColor: '#312e81',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <article
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    color: 'white',
                    width: '100%',
                    maxWidth: '1280px',
                }}
            >

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem 0',
                    }}
                >
                    <h2
                        style={{
                            fontSize: '3rem',
                            fontWeight: 'bold'
                        }}
                    >Seja bem vinde!
                    </h2>
                    <p
                        style={{
                            fontSize: '1.25rem'
                        }}
                    >Expresse aqui seus pensamentos e opiniões!
                    </p>

                    <div
                        style={{
                            display:'flex',
                            justifyContent: 'space-around',
                            gap: '1rem'
                        }}
                    >
                        <div
                            style={{
                                borderRadius: '0.5rem',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                border: '2px solid white'
                            }}
                        >
                            Nova postagem
                        </div>
                    </div>

                </div>

                <figure
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '60%'
                    }}
                >
                    <img 
                    src="https://i.imgur.com/fyfri1v.png"
                        alt="Imagem Página Home" 
                       style={{                    
                        width: '60%'
                    }} 
                        />
                </figure>
            </article>

        </section>
    )
}

export default Home