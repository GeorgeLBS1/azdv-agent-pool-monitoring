import axios_default from "axios";
import { AgentPoolModel, Agents } from "../../models/agentPool";
import { AgentPoolDetailsModel } from "../../models/agentPoolDetails";
import { PoolResponseModel } from "../../models/poolsResponse";

export class AgentStatus {
  async getAllAgentPools(organization: string, pat: string) {
    var returnData = new Array<Agents>();
    const response = await axios_default.get(
      `https://dev.azure.com/${organization}/_apis/distributedtask/pools?api-version=7.2-preview.1`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`:${pat}`).toString("base64")}`,
        },
      }
    );
    if (response.status === 200) {
      for (var agentPool of response.data.value) {
        if (!agentPool.isHosted && agentPool.size > 0) {
          returnData.push(agentPool);
        }
      }
      return returnData;
    } else {
      return returnData;
    }
  }

  async getAllAgentsStatus(organization: string, pat: string) {
    const allAgentPools: Array<Agents> = await this.getAllAgentPools(
      organization,
      pat
    );
    var response = new Array<any>();

    for (let i = 0; i < allAgentPools.length; i++) {
      const agentPool: Agents = allAgentPools[i] as Agents;
      const agentPoolDetails = await this.getAgentStatus(
        organization,
        pat,
        agentPool.id
      );
      if (agentPoolDetails.value.length === 0) {
        continue;
      }
      var agentsResponse: PoolResponseModel[] = []; // Fix: Update the type of agentsResponse
      for (const agent of agentPoolDetails.value) {
        agentsResponse.push({
          id: agent.id,
          name: agent.name,
          status: agent.status,
          statusChangedOn: agent.statusChangedOn,
          link: agent._links.web.href,
          enabled: agent.enabled,
        });
      }
      response.push({
        pool: {
          id: agentPool.id,
          name: agentPool.name,
          link: `https://dev.azure.com/${organization}/_settings/agentpools?poolId=${agentPool.id}&view=agents`,
          agents: agentsResponse,
        },
      });
    }

    return response;
  }

  async getAgentStatus(
    organization: string,
    pat: string,
    agentPoolId: number
  ): Promise<AgentPoolDetailsModel> {
    var returnData: AgentPoolDetailsModel = {} as AgentPoolDetailsModel;
    const response = await axios_default.get(
      `https://dev.azure.com/${organization}/_apis/distributedtask/pools/${agentPoolId}/agents?api-version=7.2-preview.1`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`:${pat}`).toString("base64")}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return returnData;
    }
  }
}
