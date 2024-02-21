export interface AgentPoolModel {
  count: number;
  value: Agents[];
}

export interface Agents {
  createdOn: Date;
  autoProvision: boolean;
  autoUpdate: boolean;
  autoSize: boolean;
  targetSize: number | null;
  agentCloudId: number | null;
  createdBy: CreatedBy;
  owner: CreatedBy;
  id: number;
  scope: string;
  name: string;
  isHosted: boolean;
  poolType: PoolType;
  size: number;
  isLegacy: boolean;
  options: Options;
}

export interface CreatedBy {
  displayName: string;
  url: string;
  _links: Links;
  id: string;
  uniqueName: string;
  imageUrl: string;
  descriptor: string;
}

export interface Links {
  avatar: Avatar;
}

export interface Avatar {
  href: string;
}

export enum Options {
  None = "none",
}

export enum PoolType {
  Automation = "automation",
}
