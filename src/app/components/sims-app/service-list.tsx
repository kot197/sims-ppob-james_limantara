"use client"
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/app/state/hooks';
import IconMenuPembelian from "./icon-menu-pembelian";
import { setServices } from '@/app/state/services/serviceListSlice';

export default function ServiceList() {
    const auth = useSelector((state:RootState) => state.reducer.auth);
    const services = useSelector((state: RootState) => state.reducer.serviceList.services);
    const dispatch = useAppDispatch();

    console.log(auth.token);

    useEffect(() => {
        (async () => {
            console.log(services.length);
            if(services.length > 0) {
                return;
            }
            
            // Function to fetch services
            const fetchServices = async () => {
                try {
                    const response = await fetch('https://take-home-test-api.nutech-integrasi.com/services', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${auth.token}`, // Use the auth token if needed
                            'Content-Type': 'application/json',
                        },
                    });
                    console.log("fetch services");

                    const responseBody = await response.json();

                    if (!response.ok) {
                        console.log("response not ok");
                        toast.error(responseBody.message);
                    } else {
                        console.log("response ok");
                        dispatch(setServices(responseBody.data));

                        toast.success(responseBody.message);
                        console.log(responseBody.data); 
                    }
                } catch (error) {
                    console.error('Error fetching services:', error);
                }
            };

            await fetchServices(); // Call the function to fetch services
        })();
    }, []);

    return (
        <div className="flex py-12 justify-between">
            { services.map((service) => (
                    <IconMenuPembelian key={service.service_code} srcPath={service.service_icon} altName={service.service_name} name={service.service_name} code={service.service_code}/>
            ))}
        </div>
    );
}

