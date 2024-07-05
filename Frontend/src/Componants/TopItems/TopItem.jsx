
import { Items } from "./Items";
import { Top } from "./Top";

export default function TopItem() {
  return (
   <div className="my-8">
     <div className="mt-4">
      <h1 className="text-center ga-maamli-regular font-bold text-3xl my-8">New Dishes</h1>
      <div>
        <Items/>
      </div> 
    </div>
    <div className="mt-4">
      <h1 className="text-center ga-maamli-regular font-bold text-3xl my-8">Top Offers</h1>
      <div>
        <Top/>
      </div> 
    </div>
   </div>
  )
}
