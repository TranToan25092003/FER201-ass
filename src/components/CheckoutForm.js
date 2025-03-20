import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { Button } from "react-bootstrap";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const test = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: test,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("PaymentMethod:", paymentMethod);
      alert("Thanh toán thành công!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          width: "auto",
        }}
      >
        <div
          style={{
            width: "auto",
            border: "1px solid #ccc", // Thêm border cho toàn bộ div
            borderRadius: "5px", // Bo tròn góc
            padding: "10px", // Tạo khoảng cách bên trong
            margin: "10px 0", // Thêm khoảng cách giữa div và các phần khác
          }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
              },
            }}
          />
        </div>
        <Button type="submit" disabled={!stripe}>
          Thanh toán
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
