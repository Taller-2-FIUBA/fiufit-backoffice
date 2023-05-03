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
        <Card className="user-profile">
        <CardContent className='user-profile-content'>
            {training &&
                <Box className="user-details" sx={{ flexGrow: 1, overflow: 'hidden'}}>
                    <ModalItem title='Name' value={training?.title} icon="Person"/>
                    <ModalItem title="Surname" value={training?.description} icon="Person"/>
                    <ModalItem title="Email" value={training?.type} icon="Email"/>
                    <ModalItem title="Registration Date" value={training?.difficulty} icon="CalendarToday"/>
                    <ModalItem title="Birth Date" value={training?.media} icon="Cake"/>
                    <ModalItem title="Weight" value={training?.goals[0]} />
                </Box>
            } 
        </CardContent>
        </Card>
    );
};
  
  export default TrainingDetailView;