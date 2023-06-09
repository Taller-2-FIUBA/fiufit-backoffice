import { Card, CardContent, Box } from "@mui/material";
import React from "react";
import "./ServiceDetailView.scss";

import ModalItem from "../../common/modal-item/ModalItem";
import { ServiceItem } from "../../../api/HealthcheckService";

interface ServiceDetailViewProps {
  service: ServiceItem | null;
}

const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ service }) => {
  return (
    <Card className="modal-container service-detail-view">
      <CardContent className="modal-content">
        {service && (
          <Box
            className="service-details"
            sx={{ flexGrow: 1, overflow: "hidden" }}
          >
            <ModalItem title="Name" value={service?.name} icon="Grid3x3" />
            <ModalItem
              title="Description"
              value={service?.description}
              icon="Description"
            />
            <ModalItem
              title="Doc"
              value={service?.documentation_page}
              icon="Folder"
            />
            <ModalItem
              title="Method "
              value={service?.http_method}
              icon="Http"
            />
            <ModalItem title="URL" value={service?.url} icon="Link" />
            <ModalItem
              title="Uptime (ms)"
              value={service?.uptime}
              icon="ArrowUpward"
            />
            <ModalItem
              title="Created date"
              value={service?.created_date}
              icon="DateRange"
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceDetailView;
