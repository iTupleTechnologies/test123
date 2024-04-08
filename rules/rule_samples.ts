import { Rule, RuleCondition, RuleParam, RuleEvent, ConditionGroup } from "./rules_interface";
import { evaluate } from "./rules_engine";
import RulesError from "./RulesError";

// Create a new Order Object with Cart and Payment and customer details
const order = {
  cart: {
    items: [
      {
        id: "item1",
        name: "Shoes",
        quantity: 2,
        unit_price: 100,
        total: 200,
      },
      {
        id: "item2",
        name: "Shirt",
        quantity: 1,
        unit_price: 50,
        total: 50,
      },
    ],
    total: 401,
  },
  payment: {
    payment_method: "credit_card",
    total: 200,
  },
};

const customer = {
  name: "Deepak Bhasin",
  email: "deebhasin@gmail.com",
  order_count: 5,
};

// create an object to test the above rule
const accountInformation = {
  company: "microsoft",
  status: "active",
  ptoDaysTaken: ["2016-12-25", "2016-12-26"],
};

const companyCondition: RuleCondition = {
  fact: "account-information",
  operator: "equal",
  value: "microsoft",
  path: "$.company",
  param: {
    message: "company should be microsoft",
  },
};
const statusCondition: RuleCondition = {
  fact: "account-information",
  operator: "equal",
  value: "active",
  path: "$.status",
  param: {
    message: "status should be active",
  },
};

// create a rule to check if a microsoft employee is taking christmas day off
const dayOffCondition: RuleCondition = {
  fact: "account-information",
  operator: "notContains",
  value: "2016-12-25",
  path: "$.ptoDaysTaken",
  param: {
    message: "christmas day should be taken off",
  },
};

const microsoftRule = {
  conditions: {
    all: [companyCondition, statusCondition, dayOffCondition],
  },
  event: {
    type: "microsoft-christmas-pto",
    params: {
      throwError: false,
      message: "Microsoft rule passed",
    },
  },
};

// define multiple rules based on the order object whether a person should get 10% discount or not
const rule1: Rule = {
  conditions: {
    all: [
      {
        fact: "order",
        operator: "greaterThanInclusive",
        value: 400,
        path: "$.cart.total",
        param: {
          errorCode: "ERR_CART_TOTAL",
          message: "Cart total should be {{operator}}  to {{value}}",
        },
      },
      {
        fact: "order",
        operator: "equal",
        value: "credit_card",
        path: "$.payment.payment_method",
        param: {
          message: "Payment method should be credit_card",
        },
      },
      {
        fact: "customer",
        operator: "greaterThanInclusive",
        value: 5,
        path: "$.order_count",
        param: {
          message: "Customer order count should be greater than or equal to 5",
        },
      },
      {
        fact: "customer",
        operator: "equal",
        value: "deebhasin@gmail.com",
        path: "$.email",
        param: {
          message: "Customer email not matching",
        },
      },
    ],
  },
  event: {
    type: "discount",
    params: {
      message: "10% discount applied",
    },
  },
};

// define a rule to check if a player has fouled out
const conditionGroup1: ConditionGroup = {
  all: [
    {
      fact: "gameDuration",
      operator: "equal",
      value: 48,
      path: "$",
    },
    {
      fact: "personalFoulCount",
      operator: "greaterThanInclusive",
      value: 6,
      path: "$",
    },
  ],
};

const conditionGroup2: ConditionGroup = {
  all: [
    {
      fact: "gameDuration",
      operator: "equal",
      value: 40,
      path: "$",
    },
    {
      fact: "personalFoulCount",
      operator: "greaterThanInclusive",
      value: 4,
      path: "$",
    },
  ],
};

const rule2: Rule = {
  conditions: {
    any: [conditionGroup1, conditionGroup2],
  },
  event: {
    // define the event to fire when the conditions evaluate truthy
    type: "fouledOut",
    params: {
      message: "Player has fouled out!",
    },
  },
};

// create an object to check the above rule
const game = {
  gameDuration: 48,
  personalFoulCount: 6,
};

function main(facts: any, rule: Rule) {
  // // Evaluate the rule
  try {
    const result = evaluate(facts, rule);
    console.log(result);
  } catch (e) {
    const error = e as RulesError;
    console.log(error.message, error.errorDescriptor);
  }

  // Evaluate the player fouled out rule
  // const playerFoulResult = evaluate(game, rule2);
  // console.log(playerFoulResult);
}

function client() {
  main({ order: order, customer: customer }, rule1);
}

client();
