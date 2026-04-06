
function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xs font-light'>
                            Blog Pessoal | Copyright: {data}
                        </p>
                </div>
            </div>
        </>
    )
}

export default Footer