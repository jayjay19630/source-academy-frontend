import { Dialog, DialogBody, DialogFooter, Intent, Switch } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React, { useCallback, useState } from 'react';

import { AssessmentOverview } from '../../../../commons/assessment/AssessmentTypes';
import ControlButton from '../../../../commons/ControlButton';

type Props = {
  handleAssignContestEntries: (toggleAssignTo: boolean, id: number) => void;
  data: AssessmentOverview;
};

const AssignCell: React.FC<Props> = ({ data, handleAssignContestEntries }) => {
  const [isDialogOpen, setDialogState] = useState(false);
  const [isContestEntriesAssigned] = useState(!!data.isContestEntriesAssigned);

  const handleOpenDialog = useCallback(() => setDialogState(true), []);
  const handleCloseDialog = useCallback(() => setDialogState(false), []);

  const handleToggleAssign = useCallback(() => {
    const { id } = data;
    handleAssignContestEntries(!isContestEntriesAssigned, id);
    handleCloseDialog();
  }, [data, isContestEntriesAssigned, handleAssignContestEntries, handleCloseDialog]);

  return (
    <>
      <Switch
        className="assign-cell"
        checked={isContestEntriesAssigned}
        onChange={handleOpenDialog}
      />
      <Dialog
        icon={IconNames.WARNING_SIGN}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title={`${isContestEntriesAssigned ? 'Unassign' : 'Assign'} contest entries`}
        canOutsideClickClose={true}
      >
        <DialogBody>
          <p>
            Are you sure you want to <b>{isContestEntriesAssigned ? 'unassign' : 'assign'}</b>{' '}
            contest entries for <i>{data.title}</i>?
          </p>
          {isContestEntriesAssigned ? (
            <p>
              <b>
                This will unassign all contest entries currently in the voting system. Students will
                no longer be able to see any entries to vote on in Contest Voting assessments.
              </b>
            </p>
          ) : (
            <p>
              <b>
                Any contest entries not submitted at this point will not be processed into the
                voting system and won't be shown during the voting process.
              </b>
            </p>
          )}
        </DialogBody>
        <DialogFooter
          actions={
            <>
              <ControlButton
                label="Cancel"
                icon={IconNames.CROSS}
                onClick={handleCloseDialog}
                options={{ minimal: false }}
              />
              <ControlButton
                label="Confirm"
                icon={IconNames.CONFIRM}
                onClick={handleToggleAssign}
                options={{ minimal: false, intent: Intent.DANGER }}
              />
            </>
          }
        />
      </Dialog>
    </>
  );
};

export default AssignCell;
