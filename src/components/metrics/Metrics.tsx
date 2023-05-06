import React from 'react';
import './Metrics.scss';
import { Grid, Typography, Card } from '@mui/material';
import { getUsersMetrics, UsersMetric } from '../../api/MetricsService';


const Metrics = () => {

  const [usersMetrics, setUsersMetrics] = React.useState<UsersMetric[] | undefined>();

  React.useEffect(() => {
    const fetchData = async () => {
      const data: UsersMetric[] | undefined = await getUsersMetrics();
      setUsersMetrics(data);
    }

    fetchData()
      .catch(console.error);
  }, []);

  return (
    <Grid container spacing={3} className="dashboard">
        {usersMetrics?.map((metric) => (
          <Grid item xs={12} sm={6} key={metric.name}>
            <Card className="card">
              <Typography variant="h5" component="h2" className="cardTitle">
                {metric.name}
              </Typography>
              <Typography variant="body1">
                {metric.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
  );
};

export default Metrics;
