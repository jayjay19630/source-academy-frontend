import { Card, Divider, H3 } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useState } from 'react';
import ControlButton from 'src/commons/ControlButton';
import { getPrettyDate } from 'src/commons/utils/DateHelper';

type Props = {
  questionId: number;
  submissionId: number;
  studentName: string;
  studentUsername: string;
  graderName: string | undefined;
  gradedAt: string | undefined;
};

enum SubmissionStatus {
  ACCEPTED,
  REJECTED
}

const StatusIcon: React.FC<{ status: SubmissionStatus }> = ({ status }) => (
  <Card className="status-icon">
    {status === SubmissionStatus.ACCEPTED ? (
      <div className="accepted-text">ACCEPTED</div>
    ) : (
      <div className="rejected-text">REJECTED</div>
    )}
  </Card>
);

const GradingModerator: React.FC<Props> = props => {
  const [submissionStatus, setSubmissionStatus] = useState(SubmissionStatus.ACCEPTED);

  const handleFlagSubmission = () => {
    setSubmissionStatus(
      submissionStatus === SubmissionStatus.ACCEPTED
        ? SubmissionStatus.REJECTED
        : SubmissionStatus.ACCEPTED
    );
  };

  return (
    <div className="Moderator">
      <div className="moderator-header">
        <H3>
          Currently Moderating: {props.studentName} ({props.studentUsername})
        </H3>
      </div>
      <div className="moderator-container">
        <div className="moderator-summary">
          <div className="moderator-status">
            <div>Submission Status:</div>
            <StatusIcon status={submissionStatus} />
          </div>
          <div className="moderator-token-count">
            <div>Token Count:</div>
            <div className="token-count">5</div>
          </div>
        </div>
      </div>
      <div className="moderator-flag-button">
        <ControlButton
          label={
            submissionStatus === SubmissionStatus.ACCEPTED ? 'Flag Submission' : 'Unflag Submission'
          }
          icon={IconNames.FLAG}
          onClick={handleFlagSubmission}
        />
      </div>
      {props.graderName && props.gradedAt && (
        <>
          <Divider />
          <div className="grading-editor-last-graded-details">
            Last edited by <b>{props.graderName}</b> on {getPrettyDate(props.gradedAt)}
          </div>
        </>
      )}
    </div>
  );
};

export default GradingModerator;
