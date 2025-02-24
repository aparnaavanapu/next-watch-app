
const NotFound=()=>{

    return(
        <div className="flex flex-col items-center justify-center text-center text-white bg-neutral-950 flex-grow min-h-[100vh]">
            <img src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png" alt="not found" className="m-6"/>
            <h1 className='text-2xl font-bold mb-4 '>Page Not Found</h1>
            <p className='text-lg mb-4 px-4 max-w-md'>We are sorry,the page you requested could not be found</p>
        </div>
    )

    

}
export default NotFound