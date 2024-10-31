# Base64 Encode API

## Overview

The **Base64 Encode API** is a simple web service that allows users to encode strings into Base64 format. This API exposes endpoints for encoding data and provides detailed documentation for ease of use.

## Table of Contents

- [Features](#features)
- [Endpoints](#endpoints)
  - [Documentation Endpoint](#1-documentation-endpoint-get)
  - [Encoding Endpoint](#2-encoding-endpoint-post)
- [Usage Example](#usage-example)
- [Installation](#installation)
- [Running the API Locally](#running-the-api-locally)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Encode any string to Base64 format.
- Provides clear documentation for each endpoint.
- Simple and easy-to-use API.

## Endpoints

### 1. Documentation Endpoint (GET)

- **URL:** `/functions/base64Encode`
- **Method:** `GET`
- **Description:** Retrieves the documentation for the Base64 encoding function.

#### Response
```json
{
    "name": "base64Encode",
    "description": "Encode anything to base64",
    "input": {
        "type": "string",
        "description": "Input the data you'd like to encode to base64",
        "example": "Hello, world"
    },
    "output": {
        "type": "string",
        "description": "Base64 encoded string",
        "example": "SGVsbG8sIHdvcmxk"
    }
}
```

### 2. Encoding Endpoint (POST)

- **URL:** `/functions/base64Encode`
- **Method:** `POST`
- **Description:** Encodes the provided string into Base64 format.

#### Request Body
```json
{
    "input": "Hello, world!"
}
```

#### Response
```json
{
    "output": "SGVsbG8sIHdvcmxkIQ=="
}
```

#### Notes
Ensure that the input is included in the request body as a JSON object with the key "input".

## Usage Example

### Get Documentation
- **Request:** 
```http
GET https://func-contribution.vercel.app/functions/base64Encode
```
- **Response:**
```json
{
    "name": "base64Encode",
    "description": "Encode anything to base64",
    "input": {
        "type": "string",
        "description": "Input the data you'd like to encode to base64",
        "example": "Hello, world"
    },
    "output": {
        "type": "string",
        "description": "Base64 encoded string",
        "example": "SGVsbG8sIHdvcmxk"
    }
}
```

### Post Data for Encoding
- **Request:**
```http
POST https://func-contribution.vercel.app/functions/base64Encode
```
- **Body:**
```json
{
    "input": "Hello, world!"
}
```
- **Response:**
```json
{
    "output": "SGVsbG8sIHdvcmxkIQ=="
}
```

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/EMEDAT/func-contribution.git
   ```
2. Navigate to the project directory:
   ```bash
   cd func-contribution
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

To deploy the API, you can use Vercel or any cloud provider of your choice. Ensure you follow the specific instructions for deployment on your chosen platform.

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