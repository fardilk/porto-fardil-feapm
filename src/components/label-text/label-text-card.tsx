import { LoadingButton } from "@mui/lab";
import { Box, ButtonBase, Card, CardActions, CardContent, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Iconify } from "../iconify";
import LabelTextContainer from "./label-text-container";
import type { LabelTextCardProps, LabelTextCardWrapperProps } from "./types";


const LabelTextCard = (props: LabelTextCardProps) => {
  const {
    listText,
    clickable,
    onClick,
    orientation = "horizontal",
    buttonAction,
    headerIcon,
    headerLocalIcon,
    headerProps,
    headerText
  } = props

  return (
    <Card variant="outlined">
      <LabelTextCardWrapper clickable={clickable} onClick={onClick}>
        <CardContent>
          {
            headerText && (
              <Box sx={{ display: "flex", gap: 2, px: 1.5, placeItems: "center" }}>
                <Iconify
                  icon={headerIcon}
                  localIcon={headerLocalIcon}
                  sxIcon={{ width: 32 }}
                />
                <Typography variant="subtitle1" color="secondary.darker" {...headerProps}>{headerText}</Typography>
              </Box>
            )
          }
          <LabelTextContainer
            col={1}
            disableOutline
            orientation={orientation}
            listText={listText}
          />
        </CardContent>
      </LabelTextCardWrapper>
      {
        buttonAction && (
          <CardActions>
            <Box
              sx={{
                display: "flex",
                placeItems: "center",
                gap: 1,
                flexWrap: buttonAction.length < 3 ? "nowrap" : "wrap",
                width: "100%"
              }}>
              {
                buttonAction.map((row, index) => {
                  return (
                    <LoadingButton
                      key={index}
                      fullWidth
                      variant="contained"
                      color="secondary"
                      onClick={row.action}
                      {...row.buttonProps}
                    >
                      {row.label}
                    </LoadingButton>
                  )
                })
              }
            </Box>
          </CardActions>
        )
      }
    </Card>
  )
}

const LabelTextCardWrapper = (props: LabelTextCardWrapperProps & { children?: ReactNode }) => {
  const { children, clickable, onClick } = props

  if (clickable) {
    return (
      <ButtonBase sx={{ textAlign: "start" }} onClick={onClick}>
        {children}
      </ButtonBase>
    )
  }

  return children
}

export default LabelTextCard