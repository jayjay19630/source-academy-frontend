import { Card, Checkbox, Divider, H3 } from '@blueprintjs/core';
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
  PENDING,
  FLAGGED
}

const StatusIcon: React.FC<{ status: SubmissionStatus }> = ({ status }) => {
  const text =
    status === SubmissionStatus.ACCEPTED ? (
      <div className="accepted-text">ACCEPTED</div>
    ) : status === SubmissionStatus.FLAGGED ? (
      <div className="flagged-text">FLAGGED</div>
    ) : (
      <div className="pending-text">PENDING</div>
    );
  return <Card className="status-icon">{text}</Card>;
};

const GradingModerator: React.FC<Props> = props => {
  const [submissionStatus, setSubmissionStatus] = useState(SubmissionStatus.ACCEPTED);

  const handleFlagSubmission = () => {
    setSubmissionStatus(
      submissionStatus === SubmissionStatus.ACCEPTED
        ? SubmissionStatus.PENDING
        : SubmissionStatus.ACCEPTED
    );
  };

  const handleSaveChanges = () => {
    setSubmissionStatus(SubmissionStatus.FLAGGED);
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
      <div className="moderator-reason">
        <div
          className="moderator-warning"
          style={{ opacity: submissionStatus === SubmissionStatus.ACCEPTED ? 0.4 : 1 }}
        >
          As accurately as you can, please tell us what happened with this submission. Choose as
          many reporting categories as you need to. This will only affect contests and contest
          voting.
        </div>
        <div className="moderator-checkboxes">
          <Checkbox disabled={submissionStatus === SubmissionStatus.ACCEPTED}>
            Low effort or low quality submission
          </Checkbox>
          <Checkbox disabled={submissionStatus === SubmissionStatus.ACCEPTED}>
            Includes inappropriate messages
          </Checkbox>
          <Checkbox disabled={submissionStatus === SubmissionStatus.ACCEPTED}>
            Plagiarism or unauthorized use of others' work
          </Checkbox>
        </div>
      </div>
      <div className="moderator-save-button">
        <ControlButton
          isDisabled={submissionStatus === SubmissionStatus.ACCEPTED}
          label="Save Changes"
          icon={IconNames.FLOPPY_DISK}
          onClick={handleSaveChanges}
        />
      </div>
      {props.graderName && props.gradedAt && (
        <>
          <Divider />
          <div className="grading-moderator-last-graded-details">
            Last edited by <b>{props.graderName}</b> on {getPrettyDate(props.gradedAt)}
          </div>
        </>
      )}
    </div>
  );
};

export default GradingModerator;
