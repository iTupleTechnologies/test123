import * as activities from "./Activity";
import * as workflow from "./Workflow";

// const validateOrder = new Activity("Validate Order", "validateOrder", ["order"], new ActivityOptions(3, 1, 2, 20));
// const createOrder = new Activity("Create Order", "createOrder", ["order"], new ActivityOptions(3, 1, 2, 10));
// const sendSuccessNotification = new Activity(
//   "Send Success Notification",
//   "sendSuccessNotification",
//   ["order"],
//   new ActivityOptions(3, 1, 2, 10)
// );
// const sendFailureNotification = new Activity(
//   "Send Failure Notification",
//   "sendFailureNotification",
//   ["order"],
//   new ActivityOptions(3, 1, 2, 10)
// );

// function orderWorkflow(order: any) {
//   validateOrder.execute(order);
//   createOrder.execute(order);
//   sendSuccessNotification.execute(order);
// }
const createOrder = workflow.proxyActivities(activities.createOrder, {
  startToCloseTimeout: "10 seconds",
  retries: 3,
  initialDelay: 2,
  exponentialBackoff: 2,
});
const sendSuccessNotification = workflow.proxyActivities(activities.sendSuccessNotification, {
  startToCloseTimeout: "10 seconds",
  retries: 3,
  initialDelay: 2,
  exponentialBackoff: 2,
});
const sendFailureNotification = workflow.proxyActivities(activities.sendFailureNotification, {
  startToCloseTimeout: "10 seconds",
  retries: 3,
  initialDelay: 2,
  exponentialBackoff: 2,
});

export async function createOrderWorkflow(order: any): Promise<string> {
  try {
    await createOrder(order);
    await sendSuccessNotification(order);
  } catch (error) {
    await sendFailureNotification(order);
    throw error;
  }
  return "Order created successfully";
}

createOrderWorkflow({
  id: "ORD121",
  name: "Shoes",
  quantity: 2,
  unit_price: 100,
  total: 200,
})
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
