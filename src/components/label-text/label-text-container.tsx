import { Fragment, useMemo } from "react"

import { Card, CardContent, Grid, Typography } from "@mui/material"

import { getGridLayoutMappedValue } from "src/utils/helper"
import LabelText from "./label-text"
import type { LabelTextContainerProps } from "./types"

const LabelTextContainer = ({ listText, col = 4, cardProps, disableOutline, orientation = "vertical" }: LabelTextContainerProps) => {

  const md = useMemo(() => {
    return getGridLayoutMappedValue(col)
  }, [col])

  const styles = {
    boxShadow: disableOutline ? 0 : undefined,
    borderWidth: disableOutline ? 0 : undefined,
  }

  return (
    <Card
      variant={disableOutline ? undefined : "outlined"}
      elevation={disableOutline ? 0 : undefined}
      sx={{ ...styles, ...cardProps?.sx }}
      {...cardProps}
    >
      <CardContent>
        <Grid container spacing={1}>
          {
            orientation === "vertical" && listText.map((it, index) => {
              return (
                <Grid item xs={12} md={md * (it.colSpan || 1)} key={index} >
                  <LabelText {...it} />
                </Grid>
              )
            })
          }
          {
            orientation === "horizontal" && listText.map((it, index) => {
              return (
                <Fragment key={index}>
                  <Grid item xs={4}>
                    <Typography color="grey" variant="subtitle2" {...it.titleProps}>{it.title}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2" {...it.bodyProps}>{it.body}</Typography>
                  </Grid>
                </Fragment>
              )
            })
          }
        </Grid>
      </CardContent>
    </Card>
  )
}

export default LabelTextContainer