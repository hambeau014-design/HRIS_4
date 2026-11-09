import { useState } from "react";
import { 
  EmployeeSalaryListSection, 
  type SalaryEmployee 
} from "../../components/salary/EmployeeSalaryListSection";
import { 
  EmployeeSalaryDetailsSection 
} from "../../components/salary/EmployeeSalaryDetailsSection";

function Salary() {
  const [selectedEmployee, setSelectedEmployee] = useState<SalaryEmployee | null>(null);

  return (
    <div className="grid w-full grid-cols-1 items-start gap-5 p-0 xl:grid-cols-[minmax(0,1fr)_minmax(360px,450px)]">
      {/* 상단: 급여 대상자 목록 */}
      <EmployeeSalaryListSection
        selectedEmployeeId={selectedEmployee?.id ?? null}
        onSelectEmployee={(employee) => setSelectedEmployee(employee)}
      />

      {/* 하단: 현재 급여 구성 및 변동 이력 상세 패널 */}
      <EmployeeSalaryDetailsSection
        employee={selectedEmployee}
      />
    </div>
  );
}

export default Salary;