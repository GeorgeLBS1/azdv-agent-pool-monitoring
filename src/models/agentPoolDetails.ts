export interface AgentPoolDetailsModel {
  count: number;
  value: Value[];
}

export interface Value {
  _links: Links;
  maxParallelism: number;
  createdOn: Date;
  statusChangedOn: Date;
  authorization: Authorization;
  id: number;
  name: string;
  version: string;
  osDescription: string;
  enabled: boolean;
  status: string;
  provisioningState: string;
  accessPoint: string;
}

export interface Links {
  self: Self;
  web: Self;
}

export interface Self {
  href: string;
}

export interface Authorization {
  clientId: string;
  publicKey: PublicKey;
}

export interface PublicKey {
  exponent: string;
  modulus: string;
}
