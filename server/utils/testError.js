const expect = require("chai").expect;

const testError = (func, req, statusCode, message, done) => {
  const next = (err) => err;

  return func(req, {}, next)
    .then((res) => {
      expect(res).to.be.an("error");
      expect(res).to.has.property("statusCode");
      expect(res).to.has.property("message");
      expect(res.statusCode).to.equal(statusCode);
      expect(res.message).to.equal(message);

      done();
    })
    .catch((err) => console.log(err));
};

module.exports = testError;
