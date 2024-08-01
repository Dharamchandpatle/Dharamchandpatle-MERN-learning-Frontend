import { useEffect, useState } from 'react'
import './App.css'
// import axiosInstance from './lib/AxiosInstance';
import { PostRequest, GetRequest, DeleteRequest } from './lib/request';

function App() {
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [FetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() == false) {
            event.preventDefault();
            event.stopPropagation();
        }
        const data = {
            title: title,
            description: description
        }

        PostRequest('/blog', data).then((data) => {
            setRefresh(!refresh)

        }).catch((error) => {
            console.log('error', error);
            alert("Error while creating blog ")
        })

        setValidated(true);
    };
    const handleDelete = (id) => {
        DeleteRequest(`/deletblog/${id}`).then((data) => {
            setRefresh(!refresh)
            // setFetchedData(FetchedData.filter((item)=>item.id!=id))
        }).catch((error) => {
            console.log('error', error)
            alert("Error while deleting blog")
        })

    }

    useEffect(() => {
        GetRequest('/getallblog').then((data) => {
            console.log('data', data);
            setFetchedData(data.data.data)
            setLoading(false);
        }).catch((error) => {
            console.log('error', error);
        })
    }, [refresh])

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="w-full mt-4">
                        <input className="block w-full px-4 py-2 mt-2 text-black placeholder-gray-500 bg-white border rounded-lg " type="text" placeholder="Enter title " value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    </div>

                    <div className="w-full mt-4">
                        <input className="block w-full px-4 py-2 mt-2 text-black placeholder-gray-500 bg-white border rounded-lg " type="text" placeholder="enter description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    </div>

                    <div className="flex items-center justify-center mt-4">

                        <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg " type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <div className="  w-full px-4 py-2 mt-2 text-black border-black bg-white border-4 rounded-lg">
                {
                    loading ? <h1>
                        Dharambaba Loading...
                    </h1> :
                        FetchedData?.map((data, index) => {
                            return (
                                <div key={index} className='border-2 mb-4 justify-center' >
                                    <h1 className="text-2xl font-bold ">{data.title}</h1>
                                    <p className="text-lg">{data.description}</p>
                                    <button className=" border-2 m-4 p-4 text-black rounded-full bg-red-600 font-bold "
                                        onClick={() => { handleDelete(data._id) }}>Detel Blog</button>
                                </div>
                            )
                        })

                }

            </div>
        </>
    )
}

export default App
