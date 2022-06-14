import { v4 as uuidv4 } from 'uuid';

class Uuid {
  public create() {
    return uuidv4();
  }
}

const uuid = new Uuid();

export default uuid;
