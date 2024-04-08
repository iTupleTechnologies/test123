type operator =
  | "equal"
  | "greaterThanInclusive"
  | "lessThanInclusive"
  | "greaterThanExclusive"
  | "lessThanExclusive"
  | "notEqual"
  | "contains"
  | "notContains"
  | "startsWith"
  | "endsWith"
  | "in"
  | "notIn"
  | "regex";

type RuleParam = {
  message: string;
  errorCode?: string;
};

type RuleCondition = {
  fact: string;
  operator: operator;
  value: any;
  path: string;
  param?: RuleParam;
};

type ConditionGroup = {
  all?: RuleCondition[] | ConditionGroup[];
  any?: RuleCondition[] | ConditionGroup[];
};

type RuleEvent = {
  type: string;
  params: {
    message: string;
  };
};

interface Rule {
  conditions: ConditionGroup;
  event: RuleEvent;
}

interface ErrorDescriptor {
  operator: operator;
  value: any;
  current: any;
  message: string;
  errorCode: string;
}

export { Rule, ConditionGroup, RuleCondition, RuleParam, RuleEvent, operator, ErrorDescriptor };
