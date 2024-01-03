# Log Parser App

## Overview

This project consists of a backend API (log-parser-backend) and a frontend UI (log-parser-frontend) for parsing log files and displaying the relevant information.

### Backend

#### Installation

1. Navigate to the backend directory: `cd log-parser-backend`
2. Install dependencies: `npm install`

```bash
cd log-parser-backend
npm install
```

#### Execution

Run the backend using the following command:

```bash
cd log-parser-backend
npx ts-node src/index.ts
```

#### Testing

Execute the backend tests with:

```bash
cd log-parser-backend
npm test
```

### Frontend

#### Installation

1. Navigate to the frontend directory: `cd log-parser-frontend`
2. Install dependencies: `npm install`

```bash
cd log-parser-frontend
npm install
```

#### Execution

Run the frontend using the following command:

```bash
cd log-parser-frontend
npm start
```

### Requirements

## Input File Format

Log messages should adhere to the following format:

```
<ISO Date> - <Log Level> - {"transactionId": "<UUID>", "details": "<message event/action description>", "err": "<Optional, error description>", ...<additional log information>}
```

### Example

```
2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code":404,"err":"Not found"}
```

## API Response Format

The API responds with a JSON array containing log information:

```json
[{"timestamp": <Epoch Unix Timestamp>, "loglevel": "<loglevel>", "transactionId": "<UUID>", "err": "<Error message>" }]
```

### Example

```json
[{"timestamp":1628475171259,"loglevel":"error","transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","err":"Not found"}]
```

## Frontend UI Features

The frontend UI allows users to upload log files, displays a loader during API calls, and automatically downloads the JSON file on successful response. In case of an error, an alert is shown to the user.
