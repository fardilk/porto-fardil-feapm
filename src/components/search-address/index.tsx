import { Box, Button, Dialog, DialogContent, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Typography } from "@mui/material";
import { t } from "i18next";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "src/hooks/use-fetch";
import { getDataWilayah } from "src/pages/regional";
import { Form, RHFTextField } from "../hook-form";
import { Iconify } from "../iconify";
import { Keyboard } from "../keyboard";

export type DialogSearchAddressProps = {
  open: boolean,
  handleClose: (value?: any, reason?: string) => Promise<void> | void
}

export function DialogSearchAddress(props: DialogSearchAddressProps) {
  const { handleClose, open } = props

  const searchRef = useRef<any>({});
  const [elementName, setElementName] = useState('');

  const methods = useForm({ defaultValues: { keywords: "" } })

  const { watch, handleSubmit } = methods

  const values = watch()

  const { data, isLoading, refetch } = useFetch({ keywords: '' }, async (keyword) => { return (await getDataWilayah(keyword.keywords, "ID")) })

  return (
    <Dialog
      open={open}
      onClose={() => { handleClose() }}
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <Box sx={{ mb: 4, mt: 3, mx: 1 }}>
          <Form methods={methods} onSubmit={handleSubmit((data) => { refetch({ keywords: data.keywords }) })}>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ display: 'flex', placeItems: 'center', placeContent: 'space-between', gap: 1 }}>
                <Typography variant="h6">Search Address</Typography>
                <IconButton size="large" color="error" title="Close" onClick={() => { handleClose() }}>
                  <Iconify icon="carbon:close-filled" width={28} />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  name="keywords"
                  fullWidth
                  autoComplete="off"
                  label={t('global.searchRegion')}
                  inputRef={(ref) => { searchRef.current.keywords = ref; }}
                  onClick={() => { setElementName('keywords'); }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault()
                      setElementName('')
                      refetch({ keywords: values.keywords })
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {
                  isLoading && <Skeleton height={51} />
                }
                <List>

                  {
                    data?.map((it, index) => {
                      return (
                        <ListItem
                          key={index}
                          disablePadding
                          sx={{
                            border: ({ palette }) => `1.4px ${palette.secondary.main} solid`,
                            borderRadius: 1,
                            mb: 1
                          }}
                        >
                          <ListItemButton onClick={() => { handleClose(it, "selected") }}>
                            <ListItemText primary={`${it.regionalNm}, ${it.kecNm}, ${it.kabNm}`} />
                            <ListItemIcon>
                              <Button variant="contained" size="small" color="secondary">Pilih</Button>
                            </ListItemIcon>
                          </ListItemButton>
                        </ListItem>
                      )
                    })
                  }
                </List>
              </Grid>
            </Grid>
            {elementName && (
              <Keyboard
                withDialog
                elementName={elementName}
                open={Boolean(elementName)}
                onClose={() => { setElementName(''); refetch({ keywords: values.keywords }) }}
                ref={searchRef.current}
                inputType="text"
              />
            )}
          </Form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
