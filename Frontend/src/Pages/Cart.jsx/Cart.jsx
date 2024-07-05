import {Button} from "@material-tailwind/react";
export default function Cart() {
  return (
    <div className="mt-10">
      <h1 className="text-center font-bold text-3xl ga-maamli-regular">
        CART
      </h1>
      <div>
        <div>
            <h1 className="text-center font-bold text-xl ga-maamli-regular">
              Items:
            </h1>
        </div>
        <div>
            <p>Total: 5000$</p>
            <Button>Buy</Button>
        </div>
      </div>

    </div>
  )
}
