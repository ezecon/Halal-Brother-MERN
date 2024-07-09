import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function Items() {
    const [info, setInfo] = useState(null); 
    const { id } = useParams();

    useEffect(() => {     
        const fetchItem = async () => {
            try {
                const response = await axios.get(`https://halal-brother-server.vercel.app/api/items/${id}`);
                if (response.status === 200) {
                    setInfo(response.data);
                } else {
                    toast.error("Something went wrong!");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Failed to fetch item");
            }
        };
        
        if (id) {
            fetchItem();
        }
    }, [id]);

    return (
        <div className="flex flex-col items-center mt-10">
            {info ? (
                <div className="animated flex flex-col md:flex-row md:items-start md:w-10/12 lg:w-8/12">
                    <img className="w-full md:w-6/12 rounded-lg mb-5 md:mb-0" src={info.image} alt={info.name} />
                    <div className="p-5 md:p-10 prose ">
                        <h1 className="text-4xl mt-5 mb-3 crimson playwrite-gb-s-regular">{info.name}</h1>
                        <p><span className="font-bold">Description: </span>{info.description}</p>
                        <p><span className="font-bold">Price: </span>৳{info.price}</p>
                        <p><span className="font-bold">Category:</span> {info.version}</p>
                        {info.type === 'Available' ? (
                            <p><span className="font-bold">Status:</span> <span className="text-green-600">{info.type}</span></p>
                        ) : (
                            <p><span className="font-bold">Status:</span> <span className="text-crimson">{info.type}</span></p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center">
                    <Spinner size="large" color="blue" />
                    <p className="ml-2">Loading...</p>
                </div>
            )}
        </div>
    );
}
