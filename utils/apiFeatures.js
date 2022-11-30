class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //replace [gte], [gt], [lte] and [lt]
    let newQueryStr = JSON.stringify(this.queryString).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    newQueryStr = JSON.parse(newQueryStr);
    this.query.find(newQueryStr);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortList = this.queryString.sort.split(',').join(' ');
      this.query.sort(sortList);
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fieldList = this.queryString.fields.split(',').join(' ');
      this.query.select(fieldList);
    }
    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skipValue = (page - 1) * limit;
    this.query.skip(skipValue).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
