import { CiDeliveryTruck, CiClock2 } from "react-icons/ci";
import { TfiHeadphoneAlt } from "react-icons/tfi";

export default function Blob() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-6 md:p-12 border shadow-sm mt-14 text-center rounded-lg">
                <div>
                    <CiDeliveryTruck className="mx-auto text-5xl" />
                </div>
                <p className="text-lg font-semibold my-2">Fast Delivery</p>
                <p className="text-sm">Within 2-3 hrs after ordering</p>
            </div>
            <div className="p-6 md:p-12 border shadow-sm mt-14 text-center rounded-lg">
                <div>
                    <CiClock2 className="mx-auto text-5xl" />
                </div>
                <p className="text-lg font-semibold my-2">Opening Hours</p>
                <p className="text-sm">Mon-Fri: 9.00 AM to 7.00 PM</p>
            </div>
            <div className="p-6 md:p-12 border shadow-sm mt-14 text-center rounded-lg">
                <div>
                    <TfiHeadphoneAlt className="mx-auto text-5xl" />
                </div>
                <p className="text-lg font-semibold my-2">Support</p>
                <p className="text-sm">24/7 Support available</p>
            </div>
        </div>
    );
}
