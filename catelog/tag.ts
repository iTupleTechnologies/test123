class Tag {
  name: string;
  type: tag_type;
  constructor(name: string, type: tag_type) {
    this.name = name;
    this.type = type;
  }
}

type tag_type = "product_type" | "city" | "occasion" | "recipient";

export { Tag, tag_type };
