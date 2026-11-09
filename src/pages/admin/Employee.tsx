import { useState } from "react";
import { EmployeeDetailsSection } from "../../components/employee/EmployeeDetailsSection";
import {
  EmployeeDirectorySection,
  type Employee as EmployeeType,
} from "../../components/employee/EmployeeDirectorySection";

function Employee() {
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeType | null>(null);

  return (
    <div className="grid grid-cols-[1fr_450px] gap-6 w-full items-start">
      <EmployeeDirectorySection
        selectedEmployeeId={selectedEmployee?.id ?? null}
        onSelectEmployee={setSelectedEmployee}
      />

      <EmployeeDetailsSection employee={selectedEmployee} />
    </div>
  );
}

export default Employee;