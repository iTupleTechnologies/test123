import { Rule, ConditionGroup, RuleCondition, ErrorDescriptor } from "./rules_interface";
import RulesError from "./RulesError";

export const evaluate = (facts: object, rule: Rule): string => {
  const { conditions, event } = rule;
  if (evaluateConditionGroup(facts, conditions)) {
    return event.params.message;
  } else {
    return "Rule condition failed";
  }
};

const evaluateConditionGroup = (facts: any, conditions: ConditionGroup): boolean => {
  const { all, any } = conditions;
  if (all && isConditionGroupArray(all) && all.length > 0) {
    console.log("nested condition group found all conditions", all);
    return all.every((condition: ConditionGroup) => evaluateConditionGroup(facts, condition));
  } else if (any && isConditionGroupArray(any) && any.length > 0) {
    console.log("nested condition group found any conditions", any);
    return any.some((condition: ConditionGroup) => evaluateConditionGroup(facts, condition));
  } else if (all && all.length > 0 && isRuleConditionArray(all)) {
    console.log("Leaf rule condition found all conditions", all);
    return all.every((rulegroup: RuleCondition) => evaluateRuleCondition(facts, rulegroup));
  } else if (any && any.length > 0 && isRuleConditionArray(any)) {
    console.log("Leaf rule condition found any conditions", any);
    return any.some((rulegroup: RuleCondition) => evaluateRuleCondition(facts, rulegroup));
  }
  return false;
};

const isConditionGroupArray = (input: any): input is ConditionGroup[] => {
  return Array.isArray(input) && input.every((item) => "all" in item || "any" in item);
};

const isRuleConditionArray = (input: any): input is RuleCondition[] => {
  return Array.isArray(input) && input.every((item) => "fact" in item);
};

const evaluateRuleCondition = (facts: any, condition: RuleCondition): boolean => {
  console.log("evaluating rule condition", JSON.stringify(condition));
  const { fact: factName, operator, value, path, param } = condition;
  console.log("factName is:", factName);
  const fact = facts[factName];
  console.log("fact is:", fact);
  if (!fact) {
    return false;
  }
  const targetValue = getValueFromPath(fact, path);
  const result: boolean = checkOperator(operator, value, targetValue);
  if (result === false && param) {
    console.log("Condition failed");
    throw new RulesError("Rule failed", createErrorMessage(fact, condition));
  }
  console.log("Condition success:", result);

  return result;
};

const createErrorMessage = (fact: string, condition: RuleCondition) => {
  const error: ErrorDescriptor = {
    operator: condition.operator,
    value: condition.value,
    current: getValueFromPath(fact, condition.path),
    message: condition.param?.message || "Rule Failed",
    errorCode: condition.param?.errorCode || "ERRCODENOTDEFINED",
  };
  return error;
};

const checkOperator = (operator: string, value: any, targetValue: any): boolean => {
  console.log("checking operator value target", operator, value, targetValue);
  switch (operator) {
    case "equal":
      return targetValue === value;
    case "greaterThanInclusive":
      return targetValue >= value;
    case "lessThanInclusive":
      return targetValue <= value;
    case "greaterThanExclusive":
      return targetValue > value;
    case "lessThanExclusive":
      return targetValue < value;
    case "notEqual":
      return targetValue !== value;
    case "contains":
      return targetValue.includes(value);
    case "notContains":
      return !targetValue.includes(value);
    case "startsWith":
      return targetValue.startsWith(value);
    case "endsWith":
      return targetValue.endsWith(value);
    case "in":
      return value.includes(targetValue);
    case "notIn":
      return !value.includes(targetValue);
    case "regex":
      return new RegExp(value).test(targetValue);
    default:
      return false;
  }
};
//
const getValueFromPath = (fact: any, path: string): any => {
  const pathArray = path.split(".");
  console.log(fact, pathArray);
  let value = fact;
  if (pathArray.length === 1) {
    return fact;
  } else if (pathArray.length === 2) {
    return (value = fact[pathArray[1]]);
  } else if (value) {
    for (let i = 1; i < pathArray.length; i++) {
      value = value[pathArray[i]];
    }
    return value;
  }
  return undefined;
};

//   function main() {
//     // const value = getValueFromPath(order, "$.cart.total");
//     // console.log(value);
//     console.log(evaluateRule(order, rule1));
//   }

//   main();
