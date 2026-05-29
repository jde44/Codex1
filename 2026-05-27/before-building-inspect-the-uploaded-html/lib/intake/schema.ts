import { z } from "zod";

export const useCaseIntakeSchema = z.object({
  useCaseName: z.string().min(3),
  businessProcess: z.string().min(2),
  processOwner: z.string().min(2),
  businessOwner: z.string().min(2),
  dataOwner: z.string().min(2),
  reportOwner: z.string().min(2),
  aiPurpose: z.string().min(10),
  aiOutputType: z.string().min(2),
  dataTypesUsed: z.string().min(2),
  criticalDataElements: z.string().min(2),
  systemsInvolved: z.string().min(2),
  thirdPartyTools: z.string(),
  modelProvider: z.string().min(2),
  modelFamily: z.string().min(2),
  localModelAllowed: z.boolean(),
  openSourceModelAllowed: z.boolean(),
  frontierModelRequired: z.boolean(),
  sensitiveDataInvolved: z.boolean(),
  regulatedReporting: z.boolean(),
  customerImpact: z.boolean(),
  financialImpact: z.boolean(),
  employeeImpact: z.boolean(),
  humanApprovalRequired: z.boolean(),
  expectedUsers: z.string().min(1),
  expectedFrequency: z.string().min(1),
  monthlyTokenBudget: z.coerce.number().positive(),
  workflowBudget: z.coerce.number().positive(),
  knownRisks: z.string(),
  existingControls: z.string(),
  requiredLaunchDate: z.string().min(1)
});

export type UseCaseIntakeSchema = z.infer<typeof useCaseIntakeSchema>;
