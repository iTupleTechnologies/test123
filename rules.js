/**
 * Rule for identifying microsoft employees taking pto on christmas
 *
 * the account-information fact returns:
 *  { company: 'XYZ', status: 'ABC', ptoDaysTaken: ['YYYY-MM-DD', 'YYYY-MM-DD'] }
 */
let microsoftRule = {
  conditions: {
    all: [
      {
        fact: "account-information",
        operator: "equal",
        value: "microsoft",
        path: "$.company", // access the 'company' property of "account-information"
        param: {
          message: "Person {$.name} is not a microsoft employee",
        },
      },
      {
        fact: "account-information",
        operator: "in", // can be not-in, in, equal, not-equal, contains, not-contains, containsIgnoreCase, not-containsIgnoreCase, not-equalIgnoreCase, equalIgnoreCase, regex, not-regex
        value: ["active", "paid-leave"], // 'status' can be active or paid-leave
        path: "$.status", // access the 'status' property of "account-information"
        param: {
          message: "Person {$.name} is not an active microsoft employee",
        },
      },
      {
        fact: "account-information",
        operator: "contains", // the 'ptoDaysTaken' property (an array) must contain '2016-12-25'
        value: "2016-12-25",
        path: "$.ptoDaysTaken", // access the 'ptoDaysTaken' property of "account-information"
        param: {
          message: "Person {$.name} is not taking christmas day off",
        },
      },
    ],
  },
  event: {
    type: "microsoft-christmas-pto",
    params: {
      throwError: true,
      message: "current microsoft employee taking christmas day off",
    },
  },
};
