console.log("it works!");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT|| 5555;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`My Server is running at port ${port}`);
});

const orders = [];

//Get all the orders
app.get("/get_orders", (req, res) => {
  res.status(200).send(orders);
});

app.post("/new_order", (req, res) => {
  const order = req.body;
if (order.product_name && order.customer_name && order.product_qty) {
    orders.push({
      ...order,
id: `${orders.length + 1}`,
date: Date.now().toString()
    });
res.status(200).json({
      message: "Order created successfully"
    });
  } else {
    res.status(401).json({
      message: "Invalid Order creation"
    });
  }
});


//Update the order
app.patch("/order/:id", (req, res) => {
    const order_id = req.params.id;
  const order_update = req.body;
  for (let order of orders) {
      if (order.id == order_id) {
          order.product_name = order_update.product_name;
          order.product_qty = order_update.product_qty;
          order.customer_name = order_update.customer_name;
  return res
          .status(200)
          .json({ message: "Updated Succesfully", data: order });
      }
    }
  res.status(404).json({ message: "Invalid Order Id" });
  });


//Delete an order
app.delete("/order/:id", (req, res) => {
  const order_id = req.params.id;
for (let order of orders) {
    if (order.id == order_id) {
      orders.splice(orders.indexOf(order), 1);
return res.status(200).json({
        message: "Deleted Successfully"
      });
    }
  }
res.status(404).json({ message: "Invalid Order Id" });
});
  














