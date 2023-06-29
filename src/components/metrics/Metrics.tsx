import { useEffect, useState } from "react";
import "./Metrics.scss";
import { Grid, Typography, Card } from "@mui/material";
import { getAllMetrics, MetricsResponse } from "../../api/MetricsService";

function useMetrics() {
  const [usersMetrics, setUsersMetrics] = useState<MetricsResponse[]>();

  useEffect(() => {
    console.log(usersMetrics);

    const getMetrics = async () => {
      const lametrica = await getAllMetrics();
      setUsersMetrics(lametrica);
    };

    if (!usersMetrics) {
      getMetrics();
    }
  }, [usersMetrics]);

  return usersMetrics;
}

export default function Metrics() {
  const usersMetrics = useMetrics();

  const divStyle = {
    color: "white",
  };

  return (
    <Grid container spacing={3} className="dashboard">
      {usersMetrics?.map((metric) => (
        <Grid item xs={12} sm={6} key={metric.title}>
          {metric.title == "User by location" ? (
            <Card className="card-extended">
              <Typography variant="h5" component="h2" className="cardTitle">
                {metric.title}
              </Typography>
              <Grid container spacing={1} style={{ marginTop: "10px" }}>
                {metric.value.length > 0 ? (
                  metric.value.map((v, i) => (
                    <Grid item xs={12} key={i}>
                      <Typography>{v.label}</Typography>
                      <Typography>{v.count ? v.count : 0}</Typography>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography>total</Typography>
                    <Typography>{0}</Typography>
                  </Grid>
                )}
              </Grid>
            </Card>
          ) : (
            <Card className="card">
              <Typography variant="h5" component="h2" className="cardTitle">
                {metric.title}
              </Typography>
              <Grid container spacing={1} style={{ marginTop: "10px" }}>
                {metric.value.length > 0 ? (
                  metric.value.map((v, i) => (
                    <Grid item xs={12} key={i}>
                      <Typography>{v.label}</Typography>
                      <Typography>{v.count ? v.count : 0}</Typography>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography>total</Typography>
                    <Typography>{0}</Typography>
                  </Grid>
                )}
              </Grid>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  );
}
