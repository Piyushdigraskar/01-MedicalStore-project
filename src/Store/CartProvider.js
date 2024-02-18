import React, { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
  const [medicines, setMedicines] = useState([]);
  const [items, setItems] = useState([]);

  const addItemHandler = (newMed) => {
    setMedicines((prevMedicine) => {
      const updatedMedicines = [...prevMedicine, newMed];
      console.log("Updated Medicines:", updatedMedicines);
      return updatedMedicines;
    });
  };

  const addItemToCartHandler = (item) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((prevItem) => prevItem.id === item.id);
      const updatedItems = [...prevItems];

      if (existingItemIndex !== -1) {
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        updatedItems.push({ ...item, quantity: 1 }); // Initialize quantity if not present
      }
      return updatedItems;
    });

    setMedicines((prevMeds) => {
      const updatedMeds = [...prevMeds];
      // Update quantity in the medicine list
      const existingMedIndex = updatedMeds.findIndex((med) => med.id === item.id);
      if (existingMedIndex !== -1 && updatedMeds[existingMedIndex].quantity > 0) {
        updatedMeds[existingMedIndex].quantity -= 1;
      }
      return updatedMeds;
    });
  };

  const cartContext = {
    items: items,
    medicines: medicines,
    addItems: addItemToCartHandler,
    addMedicine: addItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
