import { z } from "zod";
import {
  workspaceEmailSchema,
  workspaceNameSchema,
} from "../../../../lib/form-schemas/workspace";

export const workspaceSchema = z.object({
  workspaceName: workspaceNameSchema,
});
