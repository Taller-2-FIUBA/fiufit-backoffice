import React, { useEffect } from "react";
import "./Metrics.scss";
import { Grid, Typography, Card } from "@mui/material";
import { getAllMetrics, MetricsResponse } from "../../api/MetricsService";

export default function Metrics() {
  const [usersMetrics, setUsersMetrics] = React.useState<MetricsResponse[]>();

  useEffect(() => {
    const getMetrics = async () => {
      const lametrica = await getAllMetrics();
      setUsersMetrics(lametrica);
    };
    getMetrics();
  }, []);

  const divStyle = {
    color: "white",
  };

  return (
    <Grid container spacing={3} className="dashboard">
      {usersMetrics?.map((metric) => (
        <Grid item xs={12} sm={6} key={metric.name}>
          <Card className="card">
            <Typography variant="h5" component="h2" className="cardTitle">
              {metric.title}
            </Typography>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              {metric.value}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
