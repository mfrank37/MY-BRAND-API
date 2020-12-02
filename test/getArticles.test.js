// const app = require("..");
// const chai = require('chai');
// const chaiHttp = require("chai-http");

// chai.use(chaiHttp);
// const should = chai.should();

// //  GOOD WORKING //
// describe('# GET /api/articles', () => {
//   it('it should GET array of articles', (done) => {
//     chai.request(app)
//       .get('/api/articles')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('Array');
//         res.body.forEach(article => {
//           article.should.have.property('_id');
//           article.should.have.property('title');
//           article.should.have.property('description');
//           article.should.have.property('coverImageURL');
//           article.should.have.property('published');
//         });
//         done();
//       });
//   });
// });