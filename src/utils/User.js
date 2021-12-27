class User {
  constructor({ _id, name, postalCode, unitNum }) {
    this._id = _id;
    this.name = name;
    this.postalCode = postalCode;
    this.unitNum = unitNum;
  }
  static schema = {
    name: 'User',
    properties: {
      _id: 'string?',
      name: 'string?',
      postalCode: 'string?',
      unitNum: 'string?',
    },
    primaryKey: '_id',
  };
}

export { User };
