
# ToneFlow API

## Overview

The **ToneFlow API** is designed to generate dynamic responses based on user input tone preferences. This API supports multiple tones, allowing my users to receive responses tailored to different communication styles. Whether you're a Customer Support Agent, Marketing & Content Specialist, Sales Representative, Social Media Managers, Healthcare & Mental Health Professionals, Human Resources Professional, Educator & Trainer, or even a Legal & Financial Consultant; this will help you communicate better with your users/clients.

## Table of Contents

- [Features](#features)
- [Endpoints](#endpoints)
  - [Documentation Endpoint](#1-documentation-endpoint-get)
  - [ToneFlow Response Endpoint](#2-toneflow-response-endpoint-post)
- [Usage Example](#usage-example)
- [Installation](#installation)
- [Running the API Locally](#running-the-api-locally)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Supports diverse tones for contextual responses, including professional, empathetic, concise, friendly, and more.
- Detailed API documentation available at each endpoint.
- Built with Express and CORS to support cross-origin requests.

## Endpoints

### 1. Documentation Endpoint (GET)

- **URL:** `/functions/toneFlow`
- **Method:** `GET`
- **Description:** Retrieves documentation for the ToneFlow endpoint, explaining usage and available tones.

### 2. ToneFlow Response Endpoint (POST)

- **URL:** `/functions/toneFlow`
- **Method:** `POST`
- **Description:** Generates a contextual response based on the provided message and desired tone.

#### Request Body
```json
{
    "message": "Can I get assistance with my account?",
    "tone": "Empathetic"
}
```

#### Response
```json
{
    "response": "Of course! We understand how important this is. Please let us know what assistance you need with your account.",
    "originalMessage": "Can I get assistance with my account?"
}
```

### Supported Tones
- Professional
- Empathetic
- Concise
- Friendly
- Encouraging
- Reassuring
- Persuasive
- Inquisitive
- Thankful
- Collaborative
- Informative
- Directive
- Supportive
- Casual

## Usage Example

### Get Documentation
- **Request:** 
```http
GET https://<your-deployment-url>/functions/toneFlow
```
- **Response:** Displays HTML documentation for the ToneFlow API.

### Post for Contextual Response
- **Request:**
```http
POST https://<your-deployment-url>/functions/toneFlow
```
- **Body:**
```json
{
    "message": "Can I get assistance with my account?",
    "tone": "Friendly"
}
```
- **Response:**
```json
{
    "response": "Hey there! We're here to help you with your account. Just let us know what you need! 😊",
    "originalMessage": "Can I get assistance with my account?"
}
```

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ToneFlow.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ToneFlow
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the API Locally

To run the API locally, use the following command:

```bash
npm start
```

The server will be running at `http://localhost:3000`. 

## Deployment

Deploy the API using Vercel or another cloud provider. Ensure you follow specific instructions for deployment on your chosen platform.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of your changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For any questions or issues, please feel free to open an issue or contact the maintainer.
