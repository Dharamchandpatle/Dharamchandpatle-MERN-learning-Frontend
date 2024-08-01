import axiosInstance from "./AxiosInstance";


export const PostRequest = async (url, data) => {

    try {
        const dataFromapi = await axiosInstance.post(url, data)
        return dataFromapi
    } catch (err) {
        console.log(err)
    }
}

export const GetRequest = async (url) => {
    try {
        const dataFromapi = await axiosInstance.get(url)
        return dataFromapi
    }
    catch (err) {
        console.log(err)
    }


}

export const DeleteRequest = async (url)=>{
    try{
        const dataFromapi = await axiosInstance.delete(url)
        return dataFromapi
        }
        catch(err){
            console.log(err)
            }
            
}
