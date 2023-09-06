import { useAlerts } from "../../../../../../../../../lib/hook/swr/useAlerts";
import { alertColumns } from "./alert-columns";
import { BaseTable } from "./base-table";
import { alertSchema, Alert } from "./alert-schema";
import { useEffect } from "react";

export function AlertTable() {
  const { alerts } = useAlerts();

  const mappedAlerts = [];
  let mock_id = 0;

  if (alerts && alerts.employeeAlerts && alerts.employeeAlerts.length) {
    alerts.employeeAlerts.forEach((employeeAlert) => {
      const id = mock_id++;
      const name = employeeAlert.memberInfo.name || "";
      const role = employeeAlert.role.name || "";
      const sequence = employeeAlert.launchedSequenceInfo.title || "";
      const workflow = employeeAlert.launchedSequenceInfo.workflowTitle || "";
      const overdue = employeeAlert.overdue || "";
      mappedAlerts.push({ id, name, role, sequence, workflow, overdue });
    });
  }

  if (alerts && alerts.managerAlerts && alerts.managerAlerts.length) {
    alerts.managerAlerts.forEach((managerAlert) => {
      const id = mock_id++;
      const name = managerAlert.memberInfo.name || "";
      const role = managerAlert.role.name || "";
      const sequence = managerAlert.launchedSequenceInfo.title || "";
      const workflow = managerAlert.launchedSequenceInfo.workflowTitle || "";
      const overdue = managerAlert.overdue || "";
      mappedAlerts.push({ id, name, role, sequence, workflow, overdue });
    });
  }

  return (
    <>{alerts && <BaseTable data={mappedAlerts} columns={alertColumns} />}</>
  );
}
