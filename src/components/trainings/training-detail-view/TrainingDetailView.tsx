import { Card, CardContent, Box, Rating } from "@mui/material";
import React from "react";
import "./TrainingDetailView.scss";

import { Training } from "../../../api/TrainingService";
import ModalItem from "../../common/modal-item/ModalItem";

interface TrainingDetailViewProps {
  training: Training | null;
}

const TrainingDetailView: React.FC<TrainingDetailViewProps> = ({
  training,
}) => {
  return (
    <Card className="modal-container training-detail-view">
      <CardContent className="modal-content">
        {training && (
          <Box
            className="training-details"
            sx={{ flexGrow: 1, overflow: "hidden" }}
          >
            <ModalItem title="Id" value={training?.id} icon="Grid3x3" />
            <ModalItem
              title="Trainer"
              value={training?.trainer_id}
              icon="Hiking"
            />
            <ModalItem title="Title" value={training?.title} icon="Person" />
            <ModalItem
              title="Description"
              value={training?.description}
              icon="Person"
            />
            <ModalItem
              title="Type"
              value={training?.type}
              icon="FitnessCenter"
            />
            <ModalItem
              title="Difficulty"
              value={training?.difficulty}
              icon="ArrowUpward"
            />
            <ModalItem
              title="Media"
              value={training?.media}
              icon="VideoCameraBack"
            />
            <ModalItem title="Rating" value={training?.rating} icon="Grade" />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TrainingDetailView;
