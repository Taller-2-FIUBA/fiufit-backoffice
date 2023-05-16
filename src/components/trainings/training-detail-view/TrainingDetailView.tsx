import {Card, CardContent, Box} from '@mui/material';
import React from 'react';
import './TrainingDetailView.scss';

import { Training } from '../../../api/TrainingService';
import ModalItem from '../../common/modal-item/ModalItem';

interface TrainingDetailViewProps {
    training: Training | null;
}

const TrainingDetailView: React.FC<TrainingDetailViewProps> = ({training}) => {
    return (
        <Card className="modal-container training-detail-view">
            <CardContent className='modal-content'>
                {training &&
                    <Box className="training-details" sx={{ flexGrow: 1, overflow: 'hidden'}}>
                        <ModalItem title='Name' value={training?.tittle} icon="Person"/>
                        <ModalItem title="Surname" value={training?.description} icon="Person"/>
                        <ModalItem title="Email" value={training?.type} icon="Email"/>
                        <ModalItem title="Registration Date" value={training?.difficulty} icon="CalendarToday"/>
                        <ModalItem title="Birth Date" value={training?.media} icon="Cake"/>
                        <ModalItem title="Weight" value={training?.exercises[0].name} />
                    </Box>
                } 
            </CardContent>
        </Card>
    );
};
  
  export default TrainingDetailView;