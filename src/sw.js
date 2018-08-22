const swRegister = () => {
    if('serviceWorker' in navigator){
        window.addEventListener('load', () =>{
            navigator.serviceWorker.register('/service-worker.js')
            .then(register => {
                console.log(`SW registrado: ${register}`)
            })
            .catch(e => {
                console.error(`SW no registrado: ${e}`)
            });
        });
    }
}
export default swRegister