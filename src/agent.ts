// src/agent.ts

import { APIGatewayProxyHandler } from "aws-lambda";
import { AgentStatus } from "./domain/usecases/agentStatus";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const body = JSON.parse(event.body || "{}");
  const agentStatus = new AgentStatus();
  console.log("---------------------------body---------------------------");
  console.log(body);
  console.log("---------------------------body---------------------------");
  try {
    const response = await agentStatus.getAllAgentsStatus(
      body.organization,
      body.pat
    );
    console.log(
      "---------------------------response---------------------------"
    );
    console.log(response);
    console.log(
      "---------------------------response---------------------------"
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "Verify the organization and PAT",
      }),
    };
  }
};
