import React, { useState } from "react";
import firstImg from "../assets/img/medals/first.png";
import secondImg from "../assets/img/medals/second.png";
import thirdImg from "../assets/img/medals/third.png";
import participantImg from "../assets/img/medals/participants.png";
import { Card, Box, Avatar, Stack, Typography, Chip } from "@mui/material";
import { Divider } from "@mui/material";

const StudentCard = ({ place = 0, student = 0 }) => {
  // Set the size, avatar source, and font size based on the place prop
  let size;
  let avatarSrc;
  let fontSize;
  switch (place) {
    case 1:
      size = "large";
      avatarSrc = firstImg;
      fontSize = "1.0rem";
      break;
    case 2:
      size = "medium";
      avatarSrc = secondImg;
      fontSize = "0.9rem";
      break;

    case 3:
      size = "medium";
      avatarSrc = thirdImg;
      fontSize = "0.9rem";
      break;

    default:
      size = "small";
      avatarSrc = participantImg;
      fontSize = "0.75rem";
      break;
  }

  return (
    <Card>
      <Box sx={{ p: 2 }} display="flex" flexDirection="row-reverse">
        <Avatar
          variant="rounded"
          src={avatarSrc}
          sx={{ width: size, height: size }}
        />
        <Stack spacing={0.5}>
          <Typography fontWeight={700} sx={{ fontSize }}>
            יוסי בניון
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize }}>
            23.10.23 | 07:00
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ px: 2, py: 1, bgcolor: "background.default" }}
      >
        <Chip label="באר שבע" />
      </Stack>
    </Card>
  );
};

export default StudentCard;
