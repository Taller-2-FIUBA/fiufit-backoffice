import React, { useEffect } from "react";
import "./Metrics.scss";
import { Grid, Typography, Card } from "@mui/material";
import { getAllMetrics, Metrics } from "../../api/MetricsService";

export default function Metric() {
  const [usersMetrics, setUsersMetrics] = React.useState<Metrics[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      const data: Metrics[] = await getAllMetrics();
      setUsersMetrics(data);
    };
  }, []);

  return (
    <Grid container spacing={3} className="dashboard">
      {usersMetrics?.map((metric) => (
        <Grid item xs={12} sm={6} key={metric.name}>
          <Card className="card">
            <Typography variant="h5" component="h2" className="cardTitle">
              {metric.name}
            </Typography>
            <Typography variant="body1">{metric.value}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
