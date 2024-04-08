import { ErrorDescriptor } from "./rules_interface";

export default class RulesError extends Error {
  errorDescriptor: ErrorDescriptor;
  constructor(message: string, errorDescriptor: ErrorDescriptor) {
    super(message);
    this.name = "RulesError";
    this.errorDescriptor = errorDescriptor;
  }
}
