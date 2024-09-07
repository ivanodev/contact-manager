import Entity from "./Entity";

class EntityDeleteResult extends Entity {

  constructor(readonly deletedCount: number) {
    super();
  }
}

export default EntityDeleteResult;