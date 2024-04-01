# AZDV Agent Pool Monitoring Agent-Status

It is an API that helps to return the status of self-hosted azure devops agents, in order to know their health.
It is designed with the purpose of integrating with some other application (PowerBI, Grafana, Microsoft Teams integrations through PowerAutomate) to obtain data on the status of the agents every certain amount of time.

## Features

- Get All Agents from Agent Pools Status

## Installation

Install project with npm

```bash
  npm install
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/GeorgeLBS1/azdv-agent-pool-monitoring.git
```

Go to the project directory

```bash
  cd azdv-agent-pool-monitoring
```

Install dependencies

```bash
  npm install
```

Run Serverless Offline

```bash
  npm run dev
```

## Deployment

To deploy this project run

```bash
  npm run deploy
```

Or run

```bash
  serverless deploy --profile AWS_ACCOUNT
```

## API Reference

#### Obtain agentsStatus

```http
  Post /dev/agentsStatus
```

| Parameter      | Type     | Description                                  |
| :------------- | :------- | :------------------------------------------- |
| `organization` | `string` | **Required**. Your Azure DevOps Organization |
| `pat`          | `string` | **Required**. Azure DevOps PAT               |

### Response Schema

```json
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "type": "array",
  "items": {
    "$ref": "#/definitions/AgentPoolDetail"
  },
  "definitions": {
    "AgentPoolDetail": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "pool": {
          "$ref": "#/definitions/Pool"
        }
      },
      "required": ["pool"],
      "title": "AgentPoolDetail"
    },
    "Pool": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        },
        "link": {
          "type": "string",
          "format": "uri",
          "qt-uri-protocols": ["https"]
        },
        "agents": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Agent"
          }
        }
      },
      "required": ["agents", "id", "link", "name"],
      "title": "Pool"
    },
    "Agent": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        },
        "status": {
          "$ref": "#/definitions/Status"
        },
        "statusChangedOn": {
          "type": "string",
          "format": "date-time"
        },
        "link": {
          "type": "string",
          "format": "uri",
          "qt-uri-protocols": ["https"]
        },
        "enabled": {
          "type": "boolean"
        }
      },
      "required": ["enabled", "id", "link", "name", "status"],
      "title": "Agent"
    },
    "Status": {
      "type": "string",
      "enum": ["offline", "online"],
      "title": "Status"
    }
  }
}
```
