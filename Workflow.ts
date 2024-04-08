type ActivityOptions = {
  startToCloseTimeout: string;
  retries: number;
  initialDelay?: number;
  exponentialBackoff?: number;
};

export function proxyActivities<T extends (...args: any[]) => any>(
  targetFunction: T,
  activityOptions: ActivityOptions
): T {
  const handler: ProxyHandler<T> = {
    apply: async (target, thisArg, argumentsList) => {
      console.log(`In proxy handler Function is about to be called with arguments:`, argumentsList);
      let attempts = 0;
      while (attempts < activityOptions.retries) {
        try {
          console.log(`Attempt ${attempts + 1}: Function is about to be called with arguments:`, argumentsList);
          // Attempt to call the target function
          const result = await Reflect.apply(target, thisArg, argumentsList);
          console.log("Function executed successfully.");
          return result;
        } catch (error) {
          console.log(`Attempt ${attempts + 1} failed.`);
          attempts++;
          if (attempts === 3) {
            throw new Error("Max retry attempts reached. Function failed.");
          }
          const delayTime = activityOptions.initialDelay! * Math.pow(activityOptions.exponentialBackoff || 2, attempts);
          console.log(`Retrying in ${delayTime} seconds...`);
          await delay(delayTime);
        }
      }
    },
  };
  return new Proxy(targetFunction, handler);
}

const delay = (sec: number) => new Promise((resolve) => setTimeout(resolve, sec * 1000));

// function createFunctionProxyWithRetry<T extends (...args: any[]) => any>(targetFunction: T, maxRetries: number = 3): T {
//   const handler: ProxyHandler<T> = {
//     apply: (target, thisArg, argumentsList) => {
//       let attempts = 0;

//       while (attempts <= maxRetries) {
//         try {
//           console.log(`Attempt ${attempts + 1}: Function is about to be called with arguments:`, argumentsList);

//           // Attempt to call the target function
//           const result = Reflect.apply(target, thisArg, argumentsList);

//           console.log("Function executed successfully.");
//           return result;
//         } catch (error) {
//           console.log(`Attempt ${attempts + 1} failed.`);
//           attempts++;
//           if (attempts > maxRetries) {
//             throw new Error("Max retry attempts reached. Function failed.");
//           }
//         }
//       }

//       throw new Error("Unexpected loop exit."); // This should never happen
//     },
//   };

//   return new Proxy(targetFunction, handler);
// }

// Example usage:
// function testFunction(message: string): string {
//   console.log(message);

//   // Simulate a possible failure
//   if (Math.random() > 0.5) {
//     throw new Error("Function failed to process the request.");
//   }

//   return `Received: ${message}`;
// }

// const proxiedTestFunction = createFunctionProxyWithRetry(testFunction, 2);

// try {
//   const result = proxiedTestFunction("Hello, world!");
//   console.log(result);
// } catch (error) {
//   console.error("Error calling proxied function:", error);
// }
