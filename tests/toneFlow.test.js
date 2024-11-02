const request = require('supertest');
const app = require('../api/index');

describe('ToneFlow API', () => {
  it('should return an error if input is missing', async () => {
    const res = await request(app).post('/functions/toneFlow').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.output.error).toBe("Both 'message' and 'tone' are required in the input object.");
  });

  it('should generate a professional response for account assistance', async () => {
    const res = await request(app).post('/functions/toneFlow').send({
      input: {
        message: "Can I get assistance with my account?",
        tone: "professional"
      }
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.output.response).toBe("Absolutely! We are here to assist you with your account. Please provide more details about the assistance you need.");
  });

  it('should generate a friendly response for account assistance', async () => {
    const res = await request(app).post('/functions/toneFlow').send({
      input: {
        message: "Can I get assistance with my account?",
        tone: "friendly"
      }
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.output.response).toBe("Hey there! We're here to help you with your account. Just let us know what you need! 😊");
  });

  it('should generate an empathetic response for general inquiry', async () => {
    const res = await request(app).post('/functions/toneFlow').send({
      input: {
        message: "I have a general question.",
        tone: "empathetic"
      }
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.output.response).toBe("I understand how you feel and appreciate your patience. We're here to support you.");
  });

  it('should handle missing tone gracefully', async () => {
    const res = await request(app).post('/functions/toneFlow').send({
      input: {
        message: "Can I get assistance with my account?"
      }
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.output.error).toBe("Both 'message' and 'tone' are required in the input object.");
  });

  it('should return a default response for an unsupported tone', async () => {
    const res = await request(app).post('/functions/toneFlow').send({
      input: {
        message: "Can I get assistance with my account?",
        tone: "unsupported_tone"
      }
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.output.response).toBe("Thank you for your message. We'll do our best to assist you.");
  });

  it('should return a concise response for general inquiry', async () => {
    const res = await request(app).post('/functions/toneFlow').send({
      input: {
        message: "What's the status of my inquiry?",
        tone: "concise"
      }
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.output.response).toBe("Message received. We'll respond shortly.");
  });

  it('should return a supportive response for account assistance', async () => {
    const res = await request(app).post('/functions/toneFlow').send({
      input: {
        message: "Can I get assistance with my account?",
        tone: "supportive"
      }
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.output.response).toBe("We're here for you! Please share the details of your account issue, and we'll work through it together.");
  });

  it('should return a casual response for account assistance', async () => {
    const res = await request(app).post('/functions/toneFlow').send({
      input: {
        message: "Can I get assistance with my account?",
        tone: "casual"
      }
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.output.response).toBe("No worries! Just let us know what you need help with regarding your account, and we'll take care of it!");
  });
});
