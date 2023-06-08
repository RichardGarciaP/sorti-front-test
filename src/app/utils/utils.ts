export const reload = () => {
    if(typeof window !== "undefined"){
        setInterval(()=>{
            window.location.reload()
        }, 2000)
    }
}