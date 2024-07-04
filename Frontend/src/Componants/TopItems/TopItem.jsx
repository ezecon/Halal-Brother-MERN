import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function TopItem() {
  return (
    <div className="mt-4">
      <h1 className="text-center font-serif font-bold text-3xl my-8">Top Orders</h1>
     <div className="items-center">
          <Link to="/products"> <Button >See All</Button></Link>
     </div>
     
    </div>
  )
}
