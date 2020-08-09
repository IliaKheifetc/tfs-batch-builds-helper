import React from "react";
import styled from "styled-components";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Notification = ({ notificationData, handleClose }) => {
  const isOpen = Boolean(notificationData);
  const { type, text } = notificationData || {};
  return (
    <Wrapper key={notificationData.id}>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        key={notificationData.id}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={type}
        >
          {text}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default Notification;

const Wrapper = styled.div`
  margin-top: 25px;
`;
