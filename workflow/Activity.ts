export async function createOrder(order: any): Promise<string> {
  // This is where a call to another service is made
  // Here we are pretending that the service that creates the order returned "pass"
  const number = Math.random() * 10;
  console.log(`Creating order for ${order} is in progress...`, number);
  if (number > 4) {
    throw new Error("Order creation failed");
  }
  console.log(`Order creation for ${order} completed`);
  return "pass";
}

export async function sendSuccessNotification(order: any): Promise<string> {
  // This is where a call to another service is made
  // Here we are pretending that the service that sends the success notification returned "pass"
  const number = Math.random() * 10;
  console.log(`Sending success notification for ${order} is in progress...`, number);
  if (number > 5) {
    throw new Error("Success notification failed");
  }
  console.log(`Success notification for ${order} completed`);
  return "pass";
}

export async function sendFailureNotification(order: any): Promise<string> {
  // This is where a call to another service is made
  // Here we are pretending that the service that sends the failure notification returned "pass"

  console.log(`Failure notification for ${order} completed`);
  return "pass";
}
