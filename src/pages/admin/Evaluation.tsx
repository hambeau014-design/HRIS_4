// src/pages/Evaluation/Evaluation.tsx
import type { JSX } from "react";
import { EvaluationHeaderSection } from "../../components/evaluation/EvaluationHeaderSection";
import { EvaluationMetricsSection } from "../../components/evaluation/EvaluationMetricsSection";
import { EvaluationProgressAndRatingsSection } from "../../components/evaluation/EvaluationProgressAndRatingsSection";
import { EvaluationParticipantsSection } from "../../components/evaluation/EvaluationParticipantsSection";

export default function Evaluation(): JSX.Element {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f8fafd] p-6 gap-6">
      {/* 1. 상단 타이틀 및 안내 문구 */}
      <EvaluationHeaderSection />

      {/* 2. 주요 평가 지표 (대상자, 진행률, 완료, 미제출) */}
      <EvaluationMetricsSection />

      {/* 3. 평가 진행 현황 및 예상 등급 분포 */}
      <EvaluationProgressAndRatingsSection />

      {/* 4. 평가 대상자 목록 (검색, 상태 필터, 대상자 추가 모달 포함) */}
      <EvaluationParticipantsSection />
    </div>
  );
}