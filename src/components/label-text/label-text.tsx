import { Typography } from "@mui/material"

import type { LabelTextProps } from "./types"


const LabelText = (props: LabelTextProps) => {
  const { body, title, bodyProps, titleProps } = props

  return (
    <>
      <Typography color="grey" variant="subtitle2" {...titleProps}>{title}</Typography>
      <Typography variant="subtitle2" {...bodyProps}>{body}</Typography>
    </>
  )
}

export default LabelText