import React, { forwardRef } from 'react';

const OrderSlip = forwardRef(({ order }, ref) => {
  if (!order) return null;

  let total = 0;

  return (
    <div ref={ref} className="p-4 border border-gray-300 rounded">
      <h2 className="text-xl font-bold mb-4">Order Slip</h2>
      <hr className="my-4" />
      <h3 className="text-lg font-bold mb-2">Ordered Products</h3>
      {order.productDetails.map((product) => {
        total += product.price;
        return (
          <div key={product._id} className="mb-2">
            <p><span className="font-bold">Product Name:</span> {product.name}</p>
            <p><span className="font-bold">Product Price:</span> ৳{product.price}</p>
          </div>
        );
      })}
      <hr className="my-4" />
      <p><span className="font-bold">Total Amount:</span> ৳{total}</p>
    </div>
  );
});

export default OrderSlip;
