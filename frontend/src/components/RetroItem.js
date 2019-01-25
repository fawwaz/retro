import React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Typography,
  withStyles
} from "@material-ui/core";

import EditItemDialog from "./dialogs/EditItemDialog";
import DeleteItemDialog from "./dialogs/DeleteItemDialog";
import UpvoteItemButton from "./UpvoteItemButton";
import DownvoteItemButton from "./DownvoteItemButton";
import { CardWrapper, CardContainer } from "./styled";
import cookie from "react-cookies";

const getContent = content => {
  const separator = "===";

  if (content.includes(separator)) {
    const splitted = content.split(separator);
    return splitted.map(txt => {
      return (
        <Typography key={txt} component="p">
          {txt}
          <br />
          {separator}
          <br />
        </Typography>
      );
    });
  }
  return <Typography component="p">{content}</Typography>;
};

// check whether the upvote cookie is set. This is done within the Downvote- and UpvoteItemButton
const isUpvoted = (id, boardId) => {
  return !!cookie.load(boardId + "upvote" + id);
};

const RetroItem = props => {
  const { classes, id, author, content, points, boardId, isBlurred } = props;

  return (
    <CardWrapper isBlurred={isBlurred}>
      <CardContainer>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar} aria-label="Recipe">
                {points}
              </Avatar>
            }
            title={<Typography variant="subtitle2">{author}</Typography>}
          />
          <Divider />
          <CardContent>{getContent(content)}</CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <DeleteItemDialog id={id} boardId={boardId} />
            <EditItemDialog
              id={id}
              author={author}
              content={content}
              boardId={boardId}
            />
            {isUpvoted(id, boardId) ? (
              <DownvoteItemButton id={id} boardId={boardId} />
            ) : (
              <UpvoteItemButton id={id} boardId={boardId} />
            )}
          </CardActions>
        </Card>
      </CardContainer>
    </CardWrapper>
  );
};

const styles = {
  avatar: {
    color: "#fff",
    backgroundColor: "#73a6ad"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  card: {
    border: "1px solid lightgrey"
  }
};

export default withStyles(styles)(RetroItem);