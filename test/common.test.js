const app = require("../index");
const chai = require('chai');
const chaiHttp = require("chai-http");
const User = require("../models/userModel");
const Article = require("../models/articleModel");

chai.use(chaiHttp);
chai.should();
let testingToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZyYW5rIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA2OTM1MTIxfQ.0bdrvibZCJadSrjt0WqCYeyCjf09raumwxhvLeB-b38';
let testingVisitorToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoidmlzaXRvciIsImlhdCI6MTYwNjkzOTk1NX0.B1BvRv6V_QrqxmTVSuDGxMzk2woDVqmrKb-Hh-aEuVI';

// // GET /api/articles/
describe('# GET /api/articles', () => {
  
  it('it should GET array of articles', (done) => {
    chai.request(app)
      .get('/api/articles')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Array');
        res.body.forEach(article => {
          article.should.have.property('_id');
          article.should.have.property('title');
          article.should.have.property('description');
          article.should.have.property('coverImageURL');
          article.should.have.property('published');
        });
        done();
      })
  })

})

// // GET /api/articles/:id
describe('# GET /api/articles:id', () => {
  
  let articleID;
  
  before( async () =>{
    let anyArticle = await Article.findOne({});
    articleID = anyArticle._id;
  })

  it('it should GET array of articles', (done) => {
    chai.request(app)
      .get('/api/articles/' + articleID)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('_id');
        res.body.should.have.property('title');
        res.body.should.have.property('description');
        res.body.should.have.property('coverImageURL');
        res.body.should.have.property('published');
      })
    done();
  })

  it('should return { code:"bad-request" } if the article ID is invalid', (done) => {
    let invalidArticleID = '1234';
    chai.request(app)
      .get('/api/articles/' + invalidArticleID)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'bad-request');
        done();
      })
  })

  it('should return { code:"not-found" } if the article ID is valid and article was not found', (done) => {
    let validArticleID = 'fdfdasdfasdf';
    chai.request(app)
      .get('/api/articles/' + validArticleID)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'not-found');
        done();
      })
  })

})

// // POST api/login/
describe("# POST /api/login/", () => {
  
  let USERNAME, PASSWORD;
  
  before(async () => {
    // Get any
    const {
      username,
      password
    } = await User.findOne({});
    USERNAME = await username;
    PASSWORD = await password;
  })

  it("should not log in if without username or password", (done) => {
    chai.request(app)
      .post('/api/login')
      .send({
        username: USERNAME
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'user-not-found');
        done();
      })
  })

  it("should not log in with wrong password or username", (done) => {
    chai.request(app)
      .post('/api/login')
      .send({
        username: USERNAME,
        password: "wronguserpass"
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'user-not-found');
        done();
      })
  })

  it("should not log in the right user with wrong password", (done) => {
    chai.request(app)
      .post('/api/login')
      .send({
        username: "frank",
        password: "frankcannotpasstoday"
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        done();
      })
  })
  
  it("should log in the right user with correct password", (done) => {
    chai.request(app)
      .post('/api/login')
      .send({
        username: USERNAME,
        password: PASSWORD
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('accessToken');
        done();
      })
  })

})

// // GET api/profile/
describe("# GET /api/profile/", () => {

  it("should not GET profile without authorization", (done) => {
    chai.request(app)
      .get('/api/profile')
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'forbidden');
        done();
      })
  })

  it("should still return forbidden if user is a visitor", (done) => {
    chai.request(app)
      .get("/api/profile/")
      .set("Authorization", "JWT " + testingVisitorToken)
      .send()
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('code', 'forbidden');
        done();
      })
  })

  it("should GET the profile data with admin's accessToken", (done) => {
    chai.request(app)
      .get('/api/profile/')
      .set("Authorization", "JWT " + testingToken)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
  })

})

// // PUT api/profile/
describe("# PUT /api/profile/", () => {

  it("should not UPDATE profile without authorization", (done) => {
    chai.request(app)
      .put('/api/profile')
      .send({
        about: "Professional test without authorization"
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'forbidden');
        done();
      })
  })

  it("should still return forbidden if user is a visitor", (done) => {
    chai.request(app)
      .put("/api/profile/")
      .set("Authorization", "JWT " + testingVisitorToken)
      .send({
        names: {
          firstName: "B",
          lastName: "F"
        }
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('code', 'forbidden');
        done();
      })
  })

  it("should UPDATE the profile data with admin's accessToken", (done) => {
    chai.request(app)
      .put('/api/profile/')
      .set("Authorization", "JWT " + testingToken)
      .send({
        names: {
          firstName: "Frank",
          lastName: "MUNGERI"
        }
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'updated');
        done();
      })
  })

})

// POST /api/articles/
describe("# POST /api/articles/", () => {
  
  // has invalid published date.
  let testArticle = {
    description: ["test test test 1", "test test test 2", "test test test 3"],
    title: "test test me again",
    coverImageURL: "test-test.png",
    published: "yesterdayevening" // let's add invalid data
  }

  it("should not POST Article without authorization", (done) => {
    chai.request(app)
      .post('/api/articles/')
      .send(testArticle)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'forbidden');
        done();
      })
  })

  it("should still return forbidden if user is a visitor", (done) => {
    chai.request(app)
      .post("/api/articles/")
      .set("Authorization", "JWT " + testingVisitorToken)
      .send(testArticle)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'forbidden');
        done();
      })
  })

  it("should return validation error if article miss some fields while admin's accessToken is there", (done) => {
    chai.request(app)
      .post('/api/articles/')
      .set("Authorization", "JWT " + testingToken)
      .send(testArticle)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'post-failure');
        done();
      })
  })

  it("should POST the article if it is all valid and with admin's accessToken", (done) => {
    testArticle.published = new Date(); // add published date.
    chai.request(app)
      .post('/api/articles/')
      .set("Authorization", "JWT " + testingToken)
      .send(testArticle)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'post-success');
        done();
      })
  })

})

// // PUT /api/articles/:id
describe("# PUT /api/articles/:id", () => {

  let testArticle;

  before(async () => {
    testArticle = await Article.findOne({
      title: "test test me again"
    });
    testArticle = testArticle.toObject(); // make it accept invalid data
    testArticle.description = ["test is updated 1 again", "test is updated 2", "test is updated 3"];
    testArticle.coverImageURL = {
      url: "invalid data. this should be String not object"
    }; // let's ruin some field
  })

  it("should not UPDATE Article without authorization", (done) => {
    chai.request(app)
      .put('/api/articles/' + testArticle._id)
      .send(testArticle)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'forbidden');
        done();
      })
  })

  it("should still return forbidden if user is a visitor", (done) => {
    chai.request(app)
      .put("/api/articles/" + testArticle._id)
      .set("Authorization", "JWT " + testingVisitorToken)
      .send(testArticle)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'forbidden');
        done();
      })
  })

  it("should not update if article some fields are invalid while admin's accessToken is there", (done) => {
    chai.request(app)
      .put('/api/articles/' + testArticle._id)
      .set("Authorization", "JWT " + testingToken)
      .send(testArticle)
      .end((err, res) => {
        res.should.have.status(500);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'not-updated');
        done();
      })
  })

  it("should UPDATE the article if it is all valid and with admin's accessToken", (done) => {
    // change back to valid data
    testArticle.coverImageURL = 'valid-image-pass-the-test.jpeg';
    chai.request(app)
      .put('/api/articles/' + testArticle._id)
      .set("Authorization", "JWT " + testingToken)
      .send(testArticle)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'updated');
        done();
      })
  })

})

// DELETE /api/articles/:id
describe("# DELETE /api/articles/:id", () => {

  let testArticle;

  before(async () => {
    testArticle = await Article.findOne({
      title: "test test me again"
    });
  })

  it("should not DELETE Article without authorization", (done) => {
    chai.request(app)
      .delete('/api/articles/' + testArticle._id)
      .send(testArticle)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'forbidden');
        done();
      })
  })

  it("should still return forbidden if user is a visitor", (done) => {
    chai.request(app)
      .delete("/api/articles/" + testArticle._id)
      .set("Authorization", "JWT " + testingVisitorToken)
      .send(testArticle)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'forbidden');
        done();
      })
  })

  it("should return 404 if article is not found but with the admin's accessToken", (done) => {
    chai.request(app)
      .delete('/api/articles/' + 'fdfdasdfasdf')
      .set("Authorization", "JWT " + testingToken)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'not-found');
        done();
      })
  })

  it("should DELETE the article if it's id is valid and  and with admin's accessToken", (done) => {
    chai.request(app)
      .delete('/api/articles/' + testArticle._id)
      .set("Authorization", "JWT " + testingToken)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'deleted');
        done();
      })
  })

})

// // POST /api/questions
describe("# POST /api/questions", () => {

  let testQuestion = { // without some required fields
    question: "super question about testing",
    name: "Test Man"
  }

  it("should not POST question if it has invalid data or miss required fields", (done) => {
    chai.request(app)
      .post('/api/questions/')
      .send(testQuestion)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'not-sent');
        done();
      })
  })

  it("should POST question if it is valid", (done) => {
    testQuestion.email = "super@test.com"; // add all required field
    chai.request(app)
      .post('/api/questions/')
      .send(testQuestion)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'sent');
        done();
      })
  })

})

// GET /api/questions
describe("# GET /api/questions", () => {

  it("should not get questions without authorizaiton", (done) => {
    chai.request(app)
      .get("/api/questions/")
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'forbidden');
        done();
      })
  })

  it("should still return forbidden if user is a visitor", (done) => {
    chai.request(app)
      .get("/api/questions/")
      .set("Authorization", "JWT " + testingVisitorToken)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('type', 'application/json');
        res.body.should.have.property('code', 'forbidden');
        done();
      })
  })

  it("should GET the questions if user Authenticated is admin", (done) => {
    chai.request(app)
      .get("/api/questions/")
      .set("Authorization", "JWT " + testingToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('type', 'application/json');
        res.body.should.be.a('Array');
        res.body.forEach(question => {
          question.should.have.property('question');
          question.should.have.property('email');
          question.should.have.property('time');
          question.should.have.property('_id');
        });
        done();
      })
  })

})

// default BAD REQUEST
describe("# bad requests /asdfasdfasdf/asdfasdfasdf", () => {

  it('should return status 400 and code: "bad-request"', (done) => {
    chai.request(app)
      .put('/asdfasdfasdf/asdfasdfasdf')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('Object');
        res.should.have.property('type','application/json');
        res.body.should.have.property('code','bad-request');
        done();
      })
  })

})