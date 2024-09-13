fetch("http://localhost:3000/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    productId: "60c72b2f9b1d8b3f8e9c0f9a",
    productName: "Product A",
    productType: "food",
    quantity: 5,
    currency: "USD",
    orderedAt: "12/09/2024 14:30",
    hasDiscount: true,
    userId: "123e4567-e89b-12d3-a456-426614174000",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
